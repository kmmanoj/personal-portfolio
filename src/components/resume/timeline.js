import React from "react"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdWorkOutline, MdOutlineSchool } from "react-icons/md"

const Timeline = () => {
    return (
        <div className="bg-black">
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#111', color: '#fff', borderBottom: "0px" }}
                    contentArrowStyle={{ borderRight: '7px solid #111' }}
                    date="Aug 2021 - Present"
                    iconStyle={{ background: '#18d26e', color: '#fff' }}
                    icon={<MdWorkOutline />}
                >
                    <h3 className="vertical-timeline-element-title text-2xl font-bold">Security Engineer</h3>
                    <h3 className="vertical-timeline-element-title text-lg">Postman</h3>
                    <h4 className="vertical-timeline-element-subtitle text-sm">Bengaluru, KA, IN</h4>
                    <p className="text-base">
                        <li>Building systems for monitoring and detection</li>
                        <li>Building systems for security regression testing web applications</li>
                        <li>Vulnerability assessment and Penetration testing</li>
                        <li>Incident response</li>
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#111', color: '#fff', borderBottom: "0px" }}
                    contentArrowStyle={{ borderRight: '7px solid #111' }}
                    date="Aug 2021 - Present"
                    iconStyle={{ background: '#18d26e', color: '#fff' }}
                    icon={<MdOutlineSchool />}
                >
                <h3 className="vertical-timeline-element-title text-2xl font-bold">MS in Computer Science</h3>
                <h3 className="vertical-timeline-element-title text-lg">Georgia Institute of Technology</h3>
                <h4 className="vertical-timeline-element-subtitle text-sm">Atlanta, GA, US</h4>
                <p className="text-base">
                    Specializing in Computing and Machine Learning
                </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#111', color: '#fff', borderBottom: "0px" }}
                    contentArrowStyle={{ borderRight: '7px solid #111' }}
                    date="Nov 2020 - Aug 2021"
                    iconStyle={{ background: '#18d26e', color: '#fff' }}
                    icon={<MdWorkOutline />}
                >
                    <h3 className="vertical-timeline-element-title text-2xl font-bold">Software Development Engineer</h3>
                    <h3 className="vertical-timeline-element-title text-lg">Intuit Inc</h3>
                    <h4 className="vertical-timeline-element-subtitle text-sm">Bengaluru, KA, IN</h4>
                    <p className="text-base">
                        <li>Strategized and migrated live authorization data to a new schema with zero service downtime</li>
                        <li>Experimented FIDO2 based login to systems for employees</li>
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#111', color: '#fff', borderBottom: "0px" }}
                    contentArrowStyle={{ borderRight: '7px solid #111' }}
                    date="Aug 2018 - Nov 2020"
                    iconStyle={{ background: '#18d26e', color: '#fff' }}
                    icon={<MdWorkOutline />}
                >
                    <h3 className="vertical-timeline-element-title text-2xl font-bold">Network Automation Engineer</h3>
                    <h3 className="vertical-timeline-element-title text-lg">Intuit Inc</h3>
                    <h4 className="vertical-timeline-element-subtitle text-sm">Bengaluru, KA, IN</h4>
                    <p className="text-base">
                        <li>Built enterprise network infrastructure monitoring and alerting system</li>
                        <li>Interfaced and semi-automated incident response through slack bot</li>
                        <li>Reduced alert noise with in-house developed Event Correlation Engine</li>
                        <li>Automated Infrastructure QA</li>
                        <li>Built system to manage enterprise assets</li>
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#111', color: '#fff', borderBottom: "0px" }}
                    contentArrowStyle={{ borderRight: '7px solid #111' }}
                    date="Aug 2014 - Aug 2018"
                    iconStyle={{ background: '#18d26e', color: '#fff' }}
                    icon={<MdOutlineSchool />}
                >
                <h3 className="vertical-timeline-element-title text-2xl font-bold">BE in Computer Science and Engineering</h3>
                <h3 className="vertical-timeline-element-title text-lg">PES Institute of Technology</h3>
                <h4 className="vertical-timeline-element-subtitle text-sm">Bengaluru, KA, IN</h4>
                <p className="text-base">
                    Gold medalist
                </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#111', color: '#fff', borderBottom: "0px" }}
                    contentArrowStyle={{ borderRight: '7px solid #111' }}
                    date="Jan 2018 - Jun 2018"
                    iconStyle={{ background: '#18d26e', color: '#fff' }}
                    icon={<MdWorkOutline />}
                >
                    <h3 className="vertical-timeline-element-title text-2xl font-bold">Network Automation Co-op</h3>
                    <h3 className="vertical-timeline-element-title text-lg">Intuit Inc</h3>
                    <h4 className="vertical-timeline-element-subtitle text-sm">Bengaluru, KA, IN</h4>
                    <p className="text-base">
                        Developed a system to aid video conference troubleshooting
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#111', color: '#fff', borderBottom: "0px" }}
                    contentArrowStyle={{ borderRight: '7px solid #111' }}
                    date="May 2017 - Jul 2017"
                    iconStyle={{ background: '#18d26e', color: '#fff' }}
                    icon={<MdWorkOutline />}
                >
                    <h3 className="vertical-timeline-element-title text-2xl font-bold">Network Automation Intern</h3>
                    <h3 className="vertical-timeline-element-title text-lg">Intuit Inc</h3>
                    <h4 className="vertical-timeline-element-subtitle text-sm">Bengaluru, KA, IN</h4>
                    <p className="text-base">
                        Developed a CLI utility to troubleshoot VPN issue at an endpoint
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
            {/* <div class="grid grid-cols-2 gap-10 text-center">
                <a className="w-full p-5 mt-5 mb-20 bg-primary rounded-full text-black text-2xl" href="#">
                    Download resume
                </a>
                <a className="w-full p-5 mt-5 mb-20 bg-primary rounded-full text-black text-2xl" href="#">
                    Download CV
                </a>
            </div> */}
        </div>
    )
}

export default Timeline;