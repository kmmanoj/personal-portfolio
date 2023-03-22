---
layout: post
title:  "Gain access to an internal machine using Port forwarding - Setup experiment environment"
date:   2020-08-09 00:00:00 -0400
tags: [intermediate, application, cybersecurity, networking]
excerpt: Set up a penetration testing environment using docker containers in docker networks to learn various types of port forwarding techniques
---

Port forwarding is a technique in which a port in one machine is tunneled to a port in another machine. In simple words, a request made to a port `P1` of a machine M1 is "forwarded" as a request to port `P2` of a machine `M2`.

Imagine a web application server, where the incoming traffic is filtered by a firewall that allows only traffic to port 80 and 443 and denies the rest. A malicious user found the password to login to the web application server at port 22. But unfortunately, the firewall denies his SSH requests. What if the malicious user could port forward the request coming to port 80 of the web application server to port 22 of it? This way, the SSH requests made at port 80 of the server would be “forwarded" to port 22 and eventually serviced by `sshd` of the server.

## Scenario

Imagine yourself to be a penetration tester. After a successful social engineering attack, you enter the data center and connect your computer to the network. Your social engineering skills are so effective that you managed to learn the SSH login passwords to the jump server (or) bastion server and an internal server in the enterprise network. **Your intention is to place a hoax malware in the internal server ([watering hole](https://en.wikipedia.org/wiki/Watering_hole_attack)) in the enterprise network**. A bastion server in the data center has two network interfaces. One that connects to the enterprise network and another to the data center network.

![Scenario Visual](/assets/img/pivoting/scene.png)
<br/><small style="color: gray">Scenario Visualization</small><br/>

Let's enumerate the information you have:

* The data center is in `172.17.0.0/16` subnet and the enterprise is in `10.10.10.0/24` subnet.
* The IP address of your machine is `172.17.0.1`.
* The IP address of the network interface of the bastion server facing the data center network is `172.17.0.2`, while the network interface that is facing the enterprise network is `10.10.10.2`.
* The IP address of the internal server is `10.10.10.3`.
* The internal server doesn't have access to the internet. (Somehow)
* The SSH login credentials to the bastion server is `bastion:fortwall` and that of the internal server is `admin:homeportal`.

In this article, we shall go through the procedure to set up the environment replicating the above scenario. In the [following article](/2020/08/10/gain-access-to-an-internal-machine-using-port-forwarding-penetration-testing.html), we shall carry out the penetration test.

## Let's learn by doing - Setup

We shall set up an environment, as shown in the above diagram, in our local machine to perform the attack.

For the environment setup, we shall use dockers to create the relevant network and nodes. For the purpose of this demonstration, ensure that the penetration testing machine has the following utilities installed (most of them found pre-installed in Kali Linux distribution):

* [docker-engine](https://linuxhint.com/install_docker_kali_linux/)
* nmap
* ssh (client)
* proxychains
* python3

### Setting up the subnets

Use the default bridge network (typically `172.17.0.0/16`) provided by docker-engine as the data center network. To create the enterprise network subnet, run the following docker command:

```bash
docker network create enterprise --subnet 10.10.10.0/24
```

The penetration testing machine automatically gets the IP address `172.17.0.1` when the docker engine is live (at the interface `docker0`. It is the gateway for containers to talk to the internet).

### Setting up the nodes - modifying the default ssh server docker image

To create a docker container with sshd service turned on, we shall use the `linuxserver/openssh-server` docker image, with slight modification in `sshd_config`. Create a new file by the name `Dockerfile` and fill in with the following content.

```dockerfile
FROM linuxserver/openssh-server
ADD sshd_config /etc/ssh/sshd_config
```

Then create a file by the name `sshd_config` (which will be used to replace the original configuration in the `linuxserver/openssh-server` docker image), and fill in with the following content.

```
# ....
AuthorizedKeysFile	.ssh/authorized_keys

# ...
PasswordAuthentication yes

# ...
AllowTcpForwarding yes
GatewayPorts no
X11Forwarding no
PidFile /config/sshd.pid

# ...
Subsystem	sftp	/usr/lib/ssh/sftp-server

# ...
```

`sshd_config` is a mere stripped replica of the SSHd configuration file of the `linuxserver/openssh-server` docker image, with the following changes.

* `PasswordAuthentication yes`
* `AllowTcpForwarding yes`

Then, build the docker image by running the following command.

```bash
docker build -t sshserver:latest .
```

### Setting up the nodes - the bastion server

Now, that we have the SSH server docker image baked, run the following command to spin up a bastion server as a container in the default bridge network.

```bash
docker run -d -e SUDO_ACCESS=true \
    -e USER_NAME=bastion -e USER_PASSWORD=fortwall \
    -e PASSWORD_ACCESS=true \
    --name bastion sshserver:latest
```

To create a secondary interface for the bastion server, run the following command.

```bash
docker network connect enterprise bastion
```

After the setup, the bastion server's network configuration looks similar to the following:

![Bastion configuration](/assets/img/pivoting/bastion-config.png)

### Setting up the nodes - internal server

To spin up the internal server as a container, run the following docker command.

```bash
docker run -d -e SUDO_ACCESS=true \
    -e USER_NAME=admin -e USER_PASSWORD=homeportal \
    -e PASSWORD_ACCESS=true \
    --name internal_server \
    --network enterprise sshserver:latest
```

After the setup, the internal server's network configuration looks similar to the following:

![Internal node configuration](/assets/img/pivoting/internal-config.png)

> The `eth0` interface IP of the bastion server may not be `172.17.0.2` if there are other containers running in your machine. The IP address that the bastion server obtains needs to be noted down and used in place of `172.17.0.2` everywhere during the attack.

### It's not over yet

In the [following article](/2020/08/10/gain-access-to-an-internal-machine-using-port-forwarding-penetration-testing.html), we shall learn port forwarding by performing the penetration test.