import { Container, Header, List } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

function ExperienceItem(props) {
    return (
        <List.Item>
            <List.Icon name={props.type==="education"?"graduation cap":"suitcase"} />
            <List.Content>
                <List.Header>{props.organization}</List.Header>
                <List.Description>{props.role} | {props.period}</List.Description>
                <List.List>
                    {
                        props.points.map((point, i) => (
                                <List.Item key={i}>
                                    <List.Content>
                                        <List.Description>- {point}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        )
                    }
                </List.List>
            </List.Content>
        </List.Item>
    )
}

export default function Experience() {
    let experiences = require('../data/experience.json');
    return (
        <div>
            <Container text textAlign="justified">
                <Header as="h1">Experience</Header>
                <a href='./CV.pdf'>Download CV</a>
                <List>
                    {
                        experiences.map((experience, i) => <ExperienceItem key={i} {...experience} />)
                    }
                </List>
            </Container>
        </div>
    );
}