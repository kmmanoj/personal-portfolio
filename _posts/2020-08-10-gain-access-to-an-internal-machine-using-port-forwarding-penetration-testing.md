---
layout: post
title:  "Gain access to an internal machine using Port forwarding - Penetration Testing"
date:   2020-08-10 00:00:00 -0400
tags: intermediate application cybersecurity networking featured
excerpt: Set up a penetration testing environment using docker containers in docker networks to learn various types of port forwarding techniques
---

Port forwarding is a technique in which a port in one machine is tunneled to a port in another machine. In simple words, a request made to a port `P1` of a machine `M1` is "forwarded" as a request to port `P2` of a machine `M2`.

In the [previous blog](/2020/08/09/gain-access-to-an-internal-machine-using-port-forwarding-setup-experiment-environment.html), we set up the experiment environment which emulated the setup as shown in the following diagram. In this blog, we shall perform the penetration test as we go along learning **port forwarding**.

![Scenario Visual](/assets/img/pivoting/scene.png)
<br/><small style="color: gray">Scenario Visualization</small><br/>

## Recap

You, a penetration tester, have the following information:

* The data center is in `172.17.0.0/16` subnet and the enterprise is in `10.10.10.0/24` subnet.
* The IP address of your machine is `172.17.0.1`.
* The IP address of the network interface of the bastion server facing the data center network is `172.17.0.2`, while the network interface that is facing the enterprise network is `10.10.10.2`.
* The IP address of the internal server is `10.10.10.3`.
* The internal server doesn't have access to the internet. (Somehow)
* The SSH login credentials to the bastion server is `bastion:fortwall` and that of the internal server is `admin:homeportal`.

Your intention is to **place a hoax malware** in the internal server.

_I suggest the readers comprehend the port forwarding terminologies with respect to the machine at the readers' end._

## Recon bastion server

You begin by scanning for open ports in the bastion server, to find out which port serves the SSH service.

![Recon bastion](/assets/img/pivoting/recon.png)

The SSH server is running at **port 2222** of the bastion server and the credentials that you obtained by social engineering works!

## Recon internal server - Dynamic port forwarding

It is time to pivot at the bastion server to recon the internal network (`10.10.10.0/24`). How do you perform reconnaissance on the internal server whose IP address is `10.10.10.3`? You could install nmap and other tools in the bastion server, but that doesn't seem to be stealthy!

You plan to allocate a port in your localhost that tunnels traffic to the bastion server, and the bastion server makes requests on your behalf. This method is known as **Dynamic Port Forwarding**.

```
[localhost]-9050 <-> 2222-[bastion]-bport_any <-> iport_any-[internal_server]
-------> request
<------- response
```

SSH client provides a powerful set of options to execute port forwarding. To execute dynamic port forwarding to communicate with the internal network, run the following command.

```bash
ssh -D 9050 -p2222 -Nf bastion@172.17.0.2
```

`-D` option is used to open a port for dynamic port forwarding. The above command opens port 9050 in localhost and any request to it is forwarded to the bastion which dynamically opens a port for communication.

#### Other options

* `-p`: to specify the port to which SSH request is to be made.
* `-N`: Do not execute any command. (I don't need a shell)
* `-f`: Run SSH in the background.

Further, you configure the proxychains to run nmap through. Open the file `/etc/proxychains.conf` and add the following record (tab-separated) under the `[ProxyList]` section:

```
socks5    127.0.0.1    9050  
```

Now, you perform port scanning on the internal server at `10.10.10.3` through the bastion server at `172.17.0.2`, to find the port that services SSH requests. To do so, you run the following command:

```bash
proxychains nmap -e docker0 -Pn -sT 10.10.10.3
```

`-e` option forces nmap to use a particular interface (`172.17.0.1` in our case)

![Recon through bastion using proxychains](/assets/img/pivoting/recon-bastion.png)

## Log in to internal server - Local port forwarding

Now that you learned that the internal server serves SSH service at port 2222, you decide to log in to the server with the credentials that you have. Since the internal server is in another private network, you plan to port forward the requests made to one of the ports of the network interface reachable to you, to port 2222 of the internal server through the bastion server.

When you want to expose a service in a server to a port of an interface reachable to you, use **Local port Forwarding**.

```
[localhost]-2323 <-> 2222-[bastion]-bport <-> 2222-[internal_server]
-------> request
<------- response
```

To expose SSH service of the internal server on your local machine, run the following command.

```bash
ssh -L 2323:10.10.10.3:2222 -p2222 -Nf bastion@172.17.0.2
```

`-L` option is used to local port forward a request to a remote server. In this case, the request to port 2323 of your machine reaches the internal server at port 2222 through the session with the bastion server. The IP address (i.e. `10.10.10.3`) provided as the value for this option should be reachable by the bastion server.

Thus, by running the following command using the socially engineered credentials, you should be able to login to the internal server.

```bash
ssh -p2323 admin@localhost
```

![Login to internal server by local port forwarding](/assets/img/pivoting/login-internal.png)

## Install the hoax malware - Remote port forwarding

The final step is to install the hoax malware into the internal server. You plan to host an HTTP file server at your end and wget the hoax malware at the internal server. Remember, the internal server has no access to the internet. But, it is able to access all nodes in the enterprise subnet. Hence, you need to expose the HTTP file service running at port 8080 at your end through the bastion server to the internal server at port 8000.

When you want to expose a service running in your machine to a port of an interface reachable to a remote server, use **Remote port Forwarding**.

```
[localhost]-8080 <-> 2222-[bastion]-8000 <-x-> iport-[internal_server]
<------- request
-------> response
```

To expose the HTTP service of your local machine to the internal server through the bastion server, run the following command.

```bash
ssh -R 8000:127.0.0.1:8080 -p2222 -Nf bastion@172.17.0.2
```

`-R` option is used to remote port forward a response to a remote server. In this case, the request to port 8000 of the bastion server reaches your computer at port 8080. The IP address provided as the value for this option should be "assignable" by your computer. (You could also use `localhost` instead of the IP address of your computer. Localhost = localhost for your computer)

In another terminal, you create an empty hoax malware file by the name `hoax_malware` by running `touch hoax_malware` and start the HTTP file server using the following command.

```bash
python3 -m http.server 8080
```

But wait! You realize that remote port forwarding can only go up to the localhost network interface of the bastion server.

![Remote port forwarding to bastion server](/assets/img/pivoting/remote-port-forward.png)

## Remote port forwarding through a port that is forwarded locally

This is not a type of port forwarding, but an attempt to show the power of compounding multiple types of port forwarding techniques. You want to somehow install the hoax malware into the internal server. Your thoughts are going wild and creativity is at its peak. You think "_What if I could remote forward it to the internal server itself? I anyways have SSH access to the internal server through port 2323 of my machine_". Your fingers quickly fidget the following command on your penetration testing machine and you restart the HTTP file server.

```bash
ssh -R 8000:127.0.0.1:8080 -p2323 -Nf admin@localhost
python3 -m http.server 8080
```

And, then switch to the internal server shell terminal and try to download the hoax malware again.

```bash
wget http://localhost:8000/hoax_malware
```

![Compound port forwarding to achieve the desired requirement](/assets/img/pivoting/compound-pf.png)

**Bingo! MISSION ACCOMPLISHED!**

NOTE: There are multiple ways to gain access to the internal server. The intention of this specific series of steps is to learn port forwarding.

## More Port forwarding examples in real life

**Docker**, the well-known containerization platform extensively uses local port forwarding. The `--publish` or `-p` option enables it. The port specified prefixing the colon `:` is the port on the host which is tunneled to the port of the docker container corresponding to the service it is running.

**Ngrok**, a network utility, lets one open one or more ports to the world! Yes, I mean it, the world! I believe it is using remote port forward technique, which exposes the service running at a port in the local machine to the world through the ngrok service's `hostname:port` that pops up on the screen when one runs the ngrok utility.

**Burpsuite**, a web application penetration testing tool uses dynamic port forwarding. Here, the proxy server is the localhost itself. The proxy server typically runs at port 8080. Burpsuite processes and/or stores the request and forwards it to the server the browser is trying to reach. The response, however, comes back to Burpsuite, which forwards it to the browser and eventually gets rendered on the screen.
