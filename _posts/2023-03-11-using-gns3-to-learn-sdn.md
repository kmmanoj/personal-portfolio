---
layout: post
title:  "Using GNS3 to learn SDN"
date:   2023-03-11 00:00:00 -0400
tags: [intermediate, application, sdn, cloud, networking]
excerpt: Setup and configure your GNS3 with required elements to learn, develop and test Software Defined Networks.
---

[GNS3](https://www.gns3.com/) is a network simulation platform for creating and testing virtual networks with routers, switches, and other devices. There are many other alternatives to GNS3, but I personally prefer GNS3 since the UI is user friendly, supports multiple types of network devices and protocols and more importantly has integrations with Docker, VirtualBox and VMware.

In one of my [previous blog articles](/2023/03/10/software-defined-networks-101.html), I presented a brief and elementary introduction about Software Defined Networks. In this blog article, we shall walk through setting up GNS3, and further implement a simple controller using RYU framework on a network of SDN switches in GNS3.

## Setup

### Installing GNS3

Follow the instructions provided in the GNS3 documentation to install GNS3 in your computer system. The following link references a document that walk's through installation of GNS3 server and client in a linux machine: [https://docs.gns3.com/docs/getting-started/installation/linux](https://docs.gns3.com/docs/getting-started/installation/linux). The navigation bar on the left has installation instructions for other OSes.

### Downloading Open vSwitch

Once GNS3 is installed on your computer system, let us import Open vSwitch appliance into GNS3.

_Note: The following instructions are based on GNS3 macOS client version 2.2.37_

* On the left vertical navigation bar, select one of the icons to open a drawer showcasing list of available devices. On the bottom of this drawer, click on the button that says “New template".
* A new window with the title “New template" opens. Select “Install an appliance from the GNS3 server (recommended)" option (It is selected by default) and click “Next >" on the bottom corner of the window.
* Click on “Update from online registry" to fill the appliances list.
* Once the appliance list is filled, find and click “Open vSwitch" under the “Switches" accordion as illustrated in Figure 1. Then click on “Install" found in the bottom corner of the window.
* For simplicity, use the default settings for the rest of the installation process.

![Figure 1: Filled appliance list (As of Mar 11, 2023)](/assets/img/gns-sdn/fig1.png)
<br/><small style="color: gray">Figure 1: Filled appliance list (As of Mar 11, 2023)</small><br/>

### Setting up RYU

RYU is going to be set up on your host machine (or, in the gns3 server if you are using one). This section shows how to setup RYU in a linux or *nix based machine.

* Assuming that you have `python3` , `pip3`, and `virtualenv` installed in your host machine, create a virtual environment by running the following command: `virtualenv venv`
* Activate the created virtual environment by running: `source ./venv/bin/activate`
* Install ryu for this environment by running: `pip install ryu`

> **NOTE**: Before moving forward ensure that ryu is correctly installed and is working by running `ryu-manager` in a terminal with `venv` active.

## Simple Experiment

In this experiment, a network containing a single Open vSwitch will be used. The Open vSwitch will be connected to the controller (host machine) through a NAT at `eth0`. Two host computers will connect to the switch at `eth1` and `eth2`. The goal is to enable communication between the two hosts through the switch.

### Configure Open vSwitch

Figure 2 illustrates the network topology used for this experiment. Before starting up the Open vSwitch node, right click on the node to “edit config". Uncomment the section under `# DHCP config for eth0` . By this configuration, the switch's `eth0` interface will obtain IP address and other details from the DHCP server which is `NAT1` in this case.

> Recall: Other details?

![Figure 2: Network topology and OVS configuration](/assets/img/gns-sdn/fig2.png)
<br/><small>Figure 2: Network topology and OVS configuration</small><br/>

Then, start the Open vSwitch node and spawn an Auxiliary console. In the console, enter the following command to instruct the switch to use the specified controller for the specified bridge.

{% highlight bash %}
# Set controller IP
ovs-vsctl set-controller br0 tcp:192.168.122.1:6633
{% endhighlight %}

> Ensure that the IP address used in the above command is in fact the IP address of one of the interfaces on your host machine where GNS3 server is installed.

### Configure the PCs

Similar to the switch, right click on each PC and edit their configuration. Set manual IP address by inserting the following configuration in PC1 and PC2 respectively:

{% highlight bash %}
# For PC1
ip 10.0.0.10/24 10.0.0.1
{% endhighlight %}

{% highlight bash %}
# For PC2
ip 10.0.0.11/24 10.0.0.1
{% endhighlight %}

Verify that the two PCs are not be able to ping each other.

![Figure 3: The PCs will not be able to ping each other](/assets/img/gns-sdn/fig3.png)
<br/><small>Figure 3: The PCs will not be able to ping each other</small><br/>

### Configure the controller

Let us begin by writing the controller framework. In your host machine, create a file by the name `controller.py` and fill in with the following code:

{% highlight python %}
from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import MAIN_DISPATCHER, CONFIG_DISPATCHER
from ryu.controller.handler import set_ev_cls
from ryu.ofproto import ofproto_v1_3

class Hub(app_manager.RyuApp):
    OFP_VERSIONS = [ ofproto_v1_3.OFP_VERSION ]

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures , CONFIG_DISPATCHER)
    def switch_features_handler(self , ev):
        dp = ev.msg.datapath
        ofproto = dp.ofproto
        ofp_parser = dp.ofproto_parser

        match = ofp_parser.OFPMatch()
        actions = [ 
            ofp_parser.OFPActionOutput(
                ofproto.OFPP_CONTROLLER, 
                ofproto.OFPCML_NO_BUFFER
            ) 
        ]
        ins = [ 
            ofp_parser.OFPInstructionActions(
                ofproto.OFPIT_APPLY_ACTIONS, 
                actions
            ) 
        ]

        out = ofp_parser.OFPFlowMod(datapath=dp, match=match, instructions=ins)
        dp.send_msg(out)

    @set_ev_cls(ofp_event.EventOFPPacketIn, MAIN_DISPATCHER)
    def packet_in_handler(self, ev):
        msg = ev.msg
        dp = msg.datapath
        ofp = dp.ofproto
        ofp_parser = dp.ofproto_parser

        actions = [ ofp_parser.OFPActionOutput(ofp.OFPP_FLOOD) ]

        data = None
        if msg.buffer_id == ofp.OFP_NO_BUFFER:
             data = msg.data

        out = ofp_parser.OFPPacketOut(
            datapath=dp, buffer_id=msg.buffer_id, 
            in_port=msg.match['in_port'],
            actions=actions, data = data)
        dp.send_msg(out)
{% endhighlight %}

Then, to start the controller process run the following command in the host machine in the terminal where `venv` is active: `ryu-manager --verbose controller.py` . The logs in the terminal should indicate that the switch registered itself with the controller and is receiving `PacketIn` events from the switch.


![Figure 4: RYU controller process and its logs](/assets/img/gns-sdn/fig4.png)
<br/><small>Figure 4: RYU controller process and its logs</small><br/>

## Explanation

RYU is built on an event-based framework. The above code responds to two events: `SwitchFeatures` and `PacketIn` events. The `SwitchFeatures` event is triggered by the switch when it registers itself with the controller. The `PacketIn` event is triggered by the switch when it sees a packet that does not match any flow rule but the fallback rule. The fallback rule is set during the registration phase of the switch (as implemented in `switch_features_handler` function). While, for each packet flowing in the data plane the `packet_in_handler` function is called. The controller instructs the switch to broadcast the packet (as `actions` variable in `packet_in_handler` function) to all the ports other than the port in which the packet was received i.e. `in_port`

## Verification

Now, ping `PC2` from `PC1` and vice-versa. Observe that the two hosts are able to communicate with each other, as shown in Figure 5 (Unlike shown in Figure 2).

![Figure 5: The PCs will be able to ping each other](/assets/img/gns-sdn/fig5.png)
<br/><small>Figure 5: The PCs will be able to ping each other</small><br/>


Further, in the GNS3 UI right click on the link connecting the NAT and the Open vSwitch, and select capture packets. Then, run ping from one of the PCs to the other PC. Observe that there are OpenFlow packets surrounding the ICMP request and reply packets that makes the communication between PCs possible.

> Think: Why does the link connecting NAT and Open vSwitch see ICMP packets between the two PCs?

![Figure 6: Snippet of wireshark packet capture](/assets/img/gns-sdn/fig6.png)
<br/><small>Figure 6: Snippet of wireshark packet capture</small><br/>

## Conclusion

The above blog article demonstrates the usage of GNS3 to setup, build and simulate SDN networks. To build a multi-switch topology one could use a standard ethernet switch to connect the NAT to all the Open vSwitches, as shown in Figure 7.


![Figure 7: Topology idea for multiple Open vSwitches](/assets/img/gns-sdn/fig7.png)
<br/><small>Figure 7: Topology idea for multiple Open vSwitches</small><br/>


The controller code used here performs no more than the job of a network hub. I would strongly suggest you to learn how to develop a controller that performs L2 switching. Further, learn how to develop a controller that performs L3 switching. What about a controller that manages a cluster of switches performing L2 and L3 switching?
