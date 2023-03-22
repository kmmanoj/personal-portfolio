---
layout: post
title:  "Deploying a scalable flask app using Gunicorn and Nginx, in Docker: Part #1"
date:   2018-11-21 00:00:00 -0400
tags: [beginner, application, software engineering]
excerpt: ''
---

Docker has certainly made things simple. I still remember my first days in college. I had to dual boot my machine just to learn Linux. It was time-consuming, and rather a risky task. With the advent of cloud technologies, I could sign up with a vendor, and get a Linux based instance and practice there. And, now with docker, I don't even need a constant internet connection or a dual-boot system to practice Linux. Download the docker image (hardly a Gigabyte), spawn a container and start using it. As easy as plug and play.

New technology such as Elastic search, or complicated setup such as for OpenStack. Try your hands on it, by downloading docker images from the hub and use it.

In the first part, we will go through “dockerizing" a very simple Flask application, interfaced by Gunicorn.

![Figure 1: Objective Architecture](/assets/img/flask-app/objective-1.png)
<br/><small style="color: gray">Figure 1: Objective Architecture</small><br/>

To keep the story short, I assume that docker is already installed in the system. If you do not have docker, follow this link to setup dockers in your machine: [https://docs.docker.com/install](https://docs.docker.com/install)

## STEP #1: Create Flask app.py

Start by creating a directory, say `flask_app/`. And, the main application program, say `app.py`, under the `flask_app/` directory.

```python
from flask import Flask, render_template

application = Flask(__name__)

@application.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    application.run(host="0.0.0.0", port=80)
```

## STEP #2: Create the required template

The above code assumes that there is a template named `index.html`. Let's prove the assumption by fulfilling it. Create a directory called `templates/`, under the `flask_app/` directory. Create a file `index.html` under the `templates/` directory.

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}" />
    </head>
    <body>
        <script src="{{ url_for('static', filename='js/index.js') }}"></script>
    </body>
</html>
```

## STEP #3: Create the static files

Finally, create the static JS and CSS files. Create a directory called `static/` under the `flask_app/` directory, and `js/` and `css/` directory under it. Create the js file under the `js/` directory, and name it `index.js`.

```javascript
document.writeln("<h1>Hello world</h1>");
```

Create the css file under the `css/` directory and name it `styles.css`.

```css
h1 {
    color: red;
}
```

## STEP #4: Test drive

This is an optional step. If you do not have python already installed, you may not take the fuss to install it in your machine.

Navigate into the `flask_app/` directory. Run the flask application: 

```bash
sudo python app.py
```

Open your browser and type in `localhost:80`:


![Figure 2: Test](/assets/img/flask-app/test80.png)
<br/><small style="color: gray">Figure 2: Test</small><br/>

Run the flask application with Gunicorn. To install Gunicorn: 

```bash
pip install gunicorn
```

> Gunicorn will look for a WSGI callable named `application` if not specified. Hence, the `app.py` contains the variable named `application` on purpose.

Run the flask application interfaced by Gunicorn:

```bash
sudo gunicorn -b 0.0.0.0:80 app
```

The same output is expected as above.

## STEP #5: The dockerfile

Now, that we are ready with the flask app. It is time to “dockerize" it. To “dockerize" your application we need to create a docker image of the application first.

Create a file called `dockerfile` in the `flask_app/` directory.

```dockerfile
FROM python:3.6
ADD . /app
WORKDIR /app
RUN pip install flask gunicorn
EXPOSE 8000
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app"]
```

To summarize the content of the dockerfile; beginning from `python:3.6` docker image, add the contents in the current directory to `/app` in the container. Change the working directory to `/app`, install the required python modules, expose port 8000 in the container. And the primary process of the container is to run: `gunicorn -b 0.0.0.0:8000 app`

All the commands run exactly once, i.e during docker image creation. Except for the `CMD` command. It runs when the container is spawned.

## STEP #6: Build the docker image and spawn a container

To build the docker image, navigate to the `flask_app/` directory and run:

```bash
docker build --tag flask_gunicorn_app . 
```

Once the command runs successfully, you are ready with a portable flask app docker image. You can upload this image to the docker hub, and download and deploy it anywhere.

To spawn a container of the built image. Run:

```bash
docker run --detach -p 80:8000 flask_gunicorn_app
```

`--detach` : runs the container in the background

`-p` : maps port 80 in the host to port 8000 in the container

Open your browser and type in `localhost:80`; And, you have your flask application rendering the HTML page, and serving the static files.

There you have! Your flask application running in a docker container. In the [following article](/2018/11/20/deploying-a-scalable-flask-app-using-gunicorn-and-nginx-in-docker-part-2.html), we shall configure Nginx as a Docker container, and set it up to serve the flask web application.