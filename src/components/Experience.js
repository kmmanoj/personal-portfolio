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
                        props.points.map((point) => (
                                <List.Item>
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
    return (
        <div>
            <Container text textAlign="justified">
                <Header as="h1">Experience</Header>
                <a href='./CV.pdf'>Download CV</a>
                <List>
                    <ExperienceItem type="education" organization="something" role="nothing" period="asknkad" points={['a', 'b', 'c']} />
                    <ExperienceItem type="work" organization="something" role="nothing" period="asknkad" points={['a', 'b', 'c']} />
                </List>
            </Container>
        </div>
    );
}