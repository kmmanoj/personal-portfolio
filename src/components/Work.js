import { Container, Header } from "semantic-ui-react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { MdBrokenImage } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { AiOutlineYoutube } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";

import "semantic-ui-css/semantic.min.css";
import 'react-vertical-timeline-component/style.min.css';

function WorkItem(props) {
    let icon = undefined;
    switch(props.type) {
        case "video": icon = <AiOutlineYoutube />; break;
        case "blog": icon = <TfiWrite />; break;
        case "research": icon = <GiMaterialsScience />; break;
        default: icon = <MdBrokenImage />;
    }
    return (
        <VerticalTimelineElement
                className={`vertical-timeline-element--${props.type}`}
                contentStyle={{ border: "1px solid #000" }}
                contentArrowStyle={{ borderRight: '7px solid #000' }}
                date={props.date}
                iconStyle={{ background: '#fff', border: "0px" }}
                icon={icon}
            >
            <Header as="h3" style={{margin:0}}>{props.title}</Header>

            <p style={{margin:"10px"}}>
                {props.description} <br/>
                <a href={props.url}>Read more</a>
            </p>
        </VerticalTimelineElement>
    )
}

export default function Work() {
    let works = require('../data/work.json');
    return (
        <div>
            <Container text textAlign="justified">
                <Header as="h1">Featured Work</Header>
                <a href='https://blog.kmmanoj.me'>All work</a>
            </Container>
            <VerticalTimeline lineColor="black" layout="1-column-left">
                {
                    works.map(
                        (work, i) => (
                            <WorkItem key={i} {...work} />
                        )
                    )
                }
            </VerticalTimeline>
        </div>
    );
}