---
layout: post
title:  "\"Detailed logs on demand\" for a flask web application"
date:   2018-11-27 00:00:00 -0400
tags: [intermediate, application, software engineering]
excerpt: How about viewing detailed logs of only a particular component of a huge system in realtime?
---

Logging is a great challenge while developing a web application. Too fewer logs are as good as nothing, it does not provide enough information to troubleshoot a bug. Too many log statements burden the server with huge log files, and the troubleshooting personnel may have to search through the logs to find when exactly the bug played its part, and process them to figure out the trouble point.

I would constantly be bombarded with this issue. My flask application logs in to a SaaS application and makes REST APIs calls to it, to process the data and interpret the results. Keeping in mind the performance of the web application, the session token and the authorization tokens are generated on demand, i.e. the flask application doesn't log in to SaaS Application for every request that it gets, to access APIs from the SaaS application; instead, it reuses the session cookie until it expires. (Refreshing session token is out of the scope of this story, I will post a new story if readers insist). The change in SaaS application API's response is unknown until an Internal Server Error pops up on one of the client machines. (Or) the 500 error can even be a genuine bug in the developed code (Or) it can even be a failure in session cookie refresh (Or) as such.

What if deep debug log statements are revealed on demand, without having to restart the web application (with debugging turned on)?
(If restarted, the environment (state of the variables etc...) will be refreshed, and the bug may occur when that particular state re-occurs).

Using **signals** we can do this elegantly. A **Signal** is a notification sent by the Operating System or a process to another process, indicating a notice.

With an example, let me show you how! We shall develop a simple flask application, and wrap it with a gunicorn WSGI. The flask application has one endpoint, which returns the current time in string format. To make it look like a long request, let's put some delay in processing the request.

```python
from flask import Flask
import time 
import signal

app = Flask(__name__)

DEBUG = False
def debug(*args, **kwargs):
    if DEBUG:
        print("DEBUG:", *args, **kwargs)
    
def handler(signalnum, frame):
    global DEBUG
    DEBUG = not DEBUG
    print("DEBUG is set to", DEBUG)

signal.signal(signal.SIGUSR1, handler)

@app.route("/") 
def index():
    debug("in function one")
    for i in range(10):
        debug("in for loop", i)
        time.sleep(1)
        debug("end of the loop", i)
    debug("end of the function")
    return time.ctime()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

if __name__ == "app":
    from werkzeug.wsgi import DispatcherMiddleware
    app = DispatcherMiddleware(app)
```

Observations:

* `debug` is a function, that prints only if a global variable (constant) `DEBUG` is set to True.
* `app` is a Flask Object, that has one API endpoint, which takes at least 10 seconds to return current time string.
* A function, `handler`, is defined, that toggles the value of `DEBUG` and acknowledges the same.
* signal handler for USR1 is overridden to the function, `handler`.
* The program can run either as main, as in python process, or as an imported module, as in gunicorn wrapped web backend process.

By running it as python process. The following output was observed:

```
kmmanoj $ python app.py
* Serving Flask app "app" (lazy loading)
* Environment: production
WARNING: Do not use the development server in a production environment.
Use a production WSGI server instead.
* Debug mode: off
* Running on http://0.0.0.0:8000/ (Press CTRL+C to quit)
DEBUG is set to True
DEBUG is set to False
DEBUG is set to True
DEBUG: end of the loop 2
DEBUG: in for loop 3
DEBUG: end of the loop 3
DEBUG: in for loop 4
DEBUG: end of the loop 4
DEBUG: in for loop 5
DEBUG: end of the loop 5
DEBUG: in for loop 6
DEBUG is set to False
DEBUG is set to True
DEBUG: end of the loop 8
DEBUG: in for loop 9
DEBUG: end of the loop 9
DEBUG: end of the function
127.0.0.1 - - [27/Nov/2018 23:37:24] "GET / HTTP/1.1" 200 -
```

The signal USR1 is sent to the process as: `kill -s USR1 <pid>`

Let's take a step ahead and run it with gunicorn WSGI:

```
kmmanoj $ gunicorn -b 0.0.0.0:8000 app:app
[2018-11-27 23:41:18 +0530] [28892] [INFO] Starting gunicorn 19.8.1
[2018-11-27 23:41:18 +0530] [28892] [INFO] Listening at:
http://0.0.0.0:8000 (28892)
[2018-11-27 23:41:18 +0530] [28892] [INFO] Using worker: sync
[2018-11-27 23:41:18 +0530] [28895] [INFO] Booting worker with pid: 28895
[2018-11-27 23:41:33 +0530] [28892] [INFO] Handling signal: usr1
DEBUG is set to True
DEBUG: end of the loop 2
DEBUG: in for loop 3
DEBUG: end of the loop 3
DEBUG: in for loop 4
DEBUG: end of the loop 4
DEBUG: in for loop 5
[2018-11-27 23:41:37 +0530] [28892] [INFO] Handling signal: usr1
DEBUG is set to False
[2018-11-27 23:41:41 +0530] [28892] [INFO] Handling signal: usr1
DEBUG is set to True
DEBUG: end of the loop 9
DEBUG: end of the function
```

The signal USR1 is sent to the process as: `kill -s USR1 28892 # where 28892 is the PID of the master worker` at different times, to see the dynamism.

**NOTE**: Gunicorn uses the signal USR1 to reopen the logs files. For more information about how gunicorn handles each signal, refer to the link: [http://docs.gunicorn.org/en/stable/signals.html](http://docs.gunicorn.org/en/stable/signals.html). In this example, I have used the `USR1` signal. If reopening log files is a critical part of the deployed web application, you may choose another signal to override its handler.