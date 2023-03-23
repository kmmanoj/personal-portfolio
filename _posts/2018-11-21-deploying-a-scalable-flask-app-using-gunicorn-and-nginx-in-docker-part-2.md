---
layout: post
title:  "Deploying a scalable flask app using Gunicorn and Nginx, in Docker: Part #2"
date:   2018-11-21 00:00:00 -0400
tags: beginner application software-engineering
excerpt: ''
---

In the [previous article](/2018/11/20/deploying-a-scalable-flask-app-using-gunicorn-and-nginx-in-docker-part-1.html), we learned to create a docker image of a flask app interfaced by Gunicorn WSGI.

You can skip that story if you are already familiar with deploying a flask app in dockers. I have the docker image pushed into my docker hub repository.

[https://hub.docker.com/r/kmmanoj/flask_gunicorn_app/](https://hub.docker.com/r/kmmanoj/flask_gunicorn_app/)

In this story, we will do some architecting work. Deploy the flask app, and handle its scalability.

![Figure 1: Objective Architecture](/assets/img/flask-app/objective.png)
<br/><small style="color: gray">Figure 1: Objective Architecture</small><br/>

### Observations:

* Let the static files be placed in a volume, that is accessible by both Nginx and flask app. Flask app, to write; Nginx, to read.
* We are going to create 3 replicas of the flask_gunicorn_app, and make the load balancer handle the requests distribution.
* All the components are part of the same virtual network. (For a particular reason, we will explore it eventually #same-vnet)

Let us begin by configuring the Nginx server. There are two options to configure the Nginx server:

* Create a new image, with the new configuration.
* Use the existing base image, and mount the configuration folder in the host to conf.d/ in the nginx container.

I will go ahead with the latter option.

Create a directory, say `nginx_conf/`, and create a file called `app.conf` under it.

```
server {
    listen  80;
    server_name localhost;

    location / {
        proxy_pass http://webapp:8000/;
    }

    location /static {
        alias /var/www-data;
    }
}
```

what is http://webapp:8000/? It is the name of the service which runs the flask app in replicas behind the load balancer. We will soon see that docker handles creating a load balancer for us, for the replicas we create. Therefore, when creating a load balancer is not in our control, we eventually do not have control over the IP address that gets assigned to the load balancer. (To keep it simple). Hence, we can refer to the load balancer by the name of the service, if the service and the nginx server are in the same virtual subnet #same-vnet.

To start a Docker service, the machine should be a part of the swarm. Swarm is a cluster of machines that work together. To know more about docker swarm follow this link: [https://docs.docker.com/get-started/part4/](https://docs.docker.com/get-started/part4/)

To make the machine a part of the swarm, as the first node (manager node), run:

```bash
docker swarm init
```

The acknowledgement output gives more details about how to add more nodes to the swarm.

## Step #1: Create a virtual network

Let's now create a virtual network where all the service components will be placed. To create a docker network, run:

```bash
docker network create web_network \
--driver overlay \
--subnet=192.168.100.0/24
```

An overlay network is created having subnet `192.168.100.0/24`.

## Step #2: Create a docker volume

Next, we create a docker volume that holds the static files. To create a docker volume, run:

```bash
docker volume create web_static
```

## Step #3: Create the web application service

In this step, we will have to create 3 replicas of the `flask_gunicorn_app`, and put it behind the load balancer.

```bash
docker service create \
--name webapp \
--replicas 3 \
--mount src=web_static,dst=/app/static \
--network web_network \
kmmanoj/flask_gunicorn_app
```

How easy it is to create, three replicas, behind a load balancer.

## Step #4: Create the web proxy service

Finally, we are going to setup the webproxy server.

```bash
docker service create \
--name webproxy \
--network web_network \
--mount src=web_static,dst=/var/www-data \
--mount type=bind,src=/path/to/nginx_conf,dst=/etc/nginx/conf.d \
-p 8080:80 \
nginx
```

That's it! We are ready with the objective architecture.

Verify by running:

```bash
docker network inspect web_network
```

to see the list of containers running. You may find a container that has a substring ‘endpoint', that happens to be the load balancer created by the docker.

## Step #5: Test

Open up your browser and point to `http://localhost:8080/`

![Figure 2: Test](/assets/img/flask-app/test.png)
<br/><small style="color: gray">Figure 2: Test</small><br/>
