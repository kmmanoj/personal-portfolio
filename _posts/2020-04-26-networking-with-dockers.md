---
layout: post
title:  "Networking with dockers"
date:   2020-04-26 00:00:00 -0400
tags: advanced application cybersecurity networking
excerpt: Juggling network packets between docker containers across different subnets
---

[Docker](https://www.docker.com/) enables developers to create containers to host microservice applications in the most easiest way possible. Docker provides networking support, with the help of which two or more containers can communicate with each other.

Alright, so if the docker containers are in the same subnet, then the single broadcast domain will ensure communication between containers by switching packets. But, what if the containers are in different subnets (in different broadcast domains)? Does docker have the capability of routing packets too?

## Magic

Consider two hosts in two different subnets: `10.10.10.0/24` and `192.168.10.0/24`.

To ensure that the shells on the right top corner and bottom left corner are docker shells, observe that process number 1 is **not** 'init'.

![Containers in two different subnet able to ping each other](/assets/img/net-dockers/magic.png)

## How did you do that?

### Setting up the environment

Create two docker networks, using the following commands:

```
# tty0: docker engine node
$ docker network create left --subnet 10.10.10.0/24
$ docker network create right --subnet 192.168.10.0/24
$
```

Create a container in the left subnet and one in the right subnet, by using the following commands:

```
# tty1: left host
$ docker run -it --network left --name left_host --cap-add NET_ADMIN busybox
/ #
-------------------------
# tty2: right host
$ docker run -it --network right --name right_host --cap-add NET_ADMIN busybox
/ #
/ # # What's cap-add option?
/ # # Patience! The answer will be revealed when its time!
/ #
```

Let's try if the `right_host` is reachable from `left_host`.

```
# tty2: right host
/ # ifconfig
eth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:02
          inet addr:192.168.10.2  Bcast:192.168.10.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:14 errors:0 dropped:0 overruns:0 frame:0
          TX packets:5 errors:0 dropped:0 overruns:0 carrier:0 collisions:0 txqueuelen:0
          RX bytes:1088 (1.0 KiB)  TX bytes:434 (434.0 B)
lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0 collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
/ #
-------------------------
# tty1: left host
/ # ping 192.168.10.2 -c 3 -I 10.10.10.2
PING 192.168.10.2 (192.168.10.2) from 10.10.10.2: 56 data bytes
--- 192.168.10.2 ping statistics ---
3 packets transmitted, 0 packets received, 100% packet loss
/ #
```

Oh no! Docker doesn't seem to have routing capabilities by default.

### How did you do that, then?

To enable communication across broadcast domains, a router is required. Is a software-defined router required, in the case of docker networks?

No! Let's keep it simple. Create another similar docker container, but with two network adapters. One connected to the left network and the other to the right network.

```
# tty4: router
$ docker run -it --network left --name router --cap-add NET_ADMIN busybox
/ #
-------------------------
# tty0: docker engine node
# connect the router container to the right network too
$ docker network connect right router
$
```

Now, all we need to do is, write a rule on the hosts to route the traffic to the other subnet through the router.

```
# tty1: left host
/ # ip route add 192.168.10.0/24 via 10.10.10.3 dev eth0
/ #
-------------------------
# tty2: right host
/ # ip route add 10.10.10.0/24 via 192.168.10.3 dev eth0
/ #
```

> It is time to reveal what is `cap-add` option! The `ip route` edition commands work only if the docker container has `NET_ADMIN` permission.

The following image shows the state of the containers after configurations.

![Container configurations](/assets/img/net-dockers/cnt-config.png)

That's it! Now try reaching `right_host` from the `left_host` and vice-versa.

![Ping Test](/assets/img/net-dockers/ping-test.png)

Isn't this interesting?

## Food for thought:

Create three different subnets, with two routers between the hosts and enable the hosts to communicate with each other.

```
<host1> - network1 - <router1> - network2 - <router2> - network3 - <host2>
```

[Docker supports DNS resolutions](https://docs.docker.com/network/network-tutorial-standalone/#use-user-defined-bridge-networks) of container names to their IP address, within a network. In similar lines, create a custom DNS that resolves inter-subnet queries.
