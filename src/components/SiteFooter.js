import { Container, Segment, Header, Grid, Button, Icon } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

function Social(props) {
    let icon = props.site.toLowerCase();
    let iconText = props.site;
    let link = "";
    switch(icon) {
        case "twitter": link = `https://twitter.com/${props.handle}`; break;
        case "linkedin": link = `https://linkedin.com/in/${props.handle}`; break;
        default: link = "";
    }
    return (
        <Button color={icon} as="a" href={link} target="_blank">
            <Icon name={icon} /> {iconText}
        </Button>
    );
}

export default function SiteFooter() {
    return (
        <Segment size="massive">
            <Container text fluid>
                <Header as="h3">Manoj Vignesh K M</Header>
                <Social site="Twitter" handle="kmmanojv96" />
                <Social site="LinkedIn" handle="kmmanoj" />
            </Container>
        </Segment>
    );
}