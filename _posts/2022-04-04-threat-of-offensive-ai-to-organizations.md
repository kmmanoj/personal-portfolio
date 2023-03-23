---
layout: post
title:  "Threat of Offensive AI to organizations"
date:   2022-04-24 00:00:00 -0400
tags: intermediate concept AI-ML cybersecurity
excerpt: A summary of the survey that describes how AI can be used by adversaries to enhance their cyber attacks
---

With Artificial Intelligence burgeoning various industries and fields, it is obvious that it would revolutionize cybersecurity some day. There are organizations that use AI to test, detect and auto-recover from adversaries. But, AI in cybersecurity is a double edged sword. The referenced paper says:

> One caveat is that the ‘sword' is not symmetric depending on the wielder. For example, generative AI (deepfakes) is better for the attacker, but anomaly detection is better for the defender.

The following article summarizes the survey performed by top academicians and professionals in the field of cybersecurity on potential threats to an organization, be it industry or academia, due to offensive AI.

## Introduction

For cybersecurity, AI is a double-edged sword. An adversary employs it to perform cyber attacks for better coverage and precision. While, a defender employs it to defend against new patterns of attacks, such as zero-days and to correlate and analyze massive amount of event logs in justifiable time.

It is observed that a threat actor would employ AI for attacks to achieve better coverage, speed and success. For instance, using AI-based tools the adversary would be able to analyze huge amount of OSINT information (coverage) to study about a spear phishing target at compute speed (speed) and launch an attack with a greater degree of success.

## Offensive AI capabilities

The following content describes the capabilities of AI used by an adversary in various phases of a cyber kill chain, grouped into logical categories:

### Automation

Initially, an adversary may use deepfakes to synthesize seemingly genuine media for phishing campaigns. Further, in identifying the best point of entry to get initial foothold, next hop targeting to gain persistence, and attack coordination among nodes of the botnet for an impactful and anonymous attack. AI is capable of adapting attack to the difference in it's interactions and the environment. On the other hand, AI is capable of tampering records such as health information or case evidences to favor the adversary.

### Campaign resilience

AI-based tools can be used to plan phishing campaigns by analyzing huge amount of OSINT information of a potential spear phishing target. Further, it can be used to obfuscate malware to hamper analysis. On getting initial foothold, it can be used to identify methods to hold persistent access, and further to detect virtualization to escape into the host machine and to auto-analyze the new and unknown environment to gain further access.

### Credential theft

AI-based tools can be used to spoof biometric information to bypass authentication and authorization. On gaining initial foothold, it may employ use of an implicit key logger that determines key-presses based on eye-motions, keypad sounds or vibration of nearby surfaces due to the key press, to determine credentials. AI may also be employed to guess passwords intelligently than a mere wordlist (or, a generator using pattern), and to mine cache and analyze binaries for presence of credentials. Side channel mining can also be powered by AI that identifies minute differences in metrics such as network time, processing time, and power consumption to identify valid credentials.

### Exploit development

An adversary may use AI to reverse engineer compiled binaries to analyze and understand proprietary code. He/She may also use AI to detect (new) vulnerabilities in the software(s) installed in the compromised system to exploit and gain further access.

### Information gathering

Using technologies such as speech to text, and object recognition an adversary may spy on a target. Also, an adversary may use AI-based tools to mimic a web crawler, and translate foreign languages using NLP to mine OSINT. On the other hand, with ML models serving customer requests, an adversary may employ AI to fuzz and enumerate the parameters and hyper-parameters to steal the ML model to compromise confidentiality and for exploitation later.

### Social engineering

Deepfakes can be used for impersonation. AI can also be used to build a persona online to evade fake profile detectors. Further, AI can be used to select a target and perform spear phishing, such as using deepfakes to coax an employee to perform an action that favors the adversary. Further, it can be used to track staff, such as location, to identify hidden business relationships.

### Stealth

To gain persistence and further access an adversary needs to evade defenses setup in the organization systems. AI can be used to evade HIDS, and NIDS to ensure persistent access to the system. To gain further access through social engineering, it may be employed to create malwares to evade email filters. On the other hand, it can be used to profile usage and analyze the owner of the credentials to evade insider detectors, and profile and analyze the network traffic of the compromised machine to perform scanning and propagation without turning up the alerts. Similarly, it may use seemingly usual traffic such as a Facebook chat message to exfiltrate data. Finally, AI may be employed to identify and remove abnormal log events in detection systems to cover it's tracks.

### Survey results and conclusion

The capabilities are ranked based on Profit (P), Achievability (A), Defeatability (D) and Harm (H) as:

```Threat score = H * R```

where, Risk R is calculated as ratio between Motivation M and Defeatability D, and M is calculated as the average of Profit and Achievability scores.

It is observed that industry and academia do not agree on similar ranks of threats. The industry are concerned about reverse engineering, impersonation and AI model thefts as their top three threats, while academia observes them to be biometric spoofing, impersonation and spear phishing. However, both agree upon stealth as the least threatening AI capability.

AI is easily accessible and research developments around them are in rapid pace. Hence, one may expect rise in the use of AI for cyber attacks in the near future. To defend against such attacks, the defences are forced to use AI powered automation. Therefore, keeping a human informed about the happenings in such hyper-automation systems needs further research.

The researchers recommend use of post-processing tools such as anti-vulnerability detection, to train employees and staffs about identifying AI-powered social engineering attacks and to embrace MLSecOps.

## Conclusion

It is indeed unjustifiable to claim that this 5 min blog article covers the 31-page content of the survey. I highly recommend readers to read the research paper to get a detailed understanding.

## Reference

[1] Mirsky, Y., Demontis, A., Kotak, J., Shankar, R., Gelei, D., Yang, L., Zhang, X., Lee, W., Elovici, Y., and Biggio, B.. (2021). The Threat of Offensive AI to Organizations. [https://arxiv.org/abs/2106.15764](https://arxiv.org/abs/2106.15764)