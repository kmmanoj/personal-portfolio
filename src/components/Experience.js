import { Container, Header } from "semantic-ui-react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { MdWorkOutline, MdOutlineSchool } from "react-icons/md"

import "semantic-ui-css/semantic.min.css";
import 'react-vertical-timeline-component/style.min.css';

function ExperienceItem(props) {
    let description = props.description;
    if(props.description.indexOf(';') !== -1) {
        description = description.split(';').map((dsc) => <li>{dsc}</li>);
    }
    return (
        <VerticalTimelineElement
                className={`vertical-timeline-element--${props.type}`}
                contentStyle={{ border: "1px solid #000" }}
                contentArrowStyle={{ borderRight: '7px solid #000' }}
                date={props.period}
                iconStyle={{ background: '#fff', border: "0px" }}
                icon={props.type==="education"?<MdOutlineSchool />:<MdWorkOutline />}
            >
            <Header as="h3" style={{margin:0}}>{props.role}
                <Header.Subheader>{props.organization}</Header.Subheader>
            </Header>

            <p style={{padding:"10px"}}>
                {description}
            </p>
        </VerticalTimelineElement>
    )
}

export default function Experience() {
    let experiences = require('../data/experience.json');
    return (
        <div>
            <Container text textAlign="justified">
                <Header as="h1">Experience</Header>
                <a href='./CV.pdf'>Download CV</a>
            </Container>
            <VerticalTimeline lineColor="black">
                {
                    experiences.map(
                        (experience, i) => (
                            <ExperienceItem key={i} {...experience} />
                        )
                    )
                }
            </VerticalTimeline>
        </div>
    );
}