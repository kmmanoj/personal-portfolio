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
        <Segment size="massive" style={{"position": "absolute", "bottom": "0", "width": "100%", "height": "20%"}}>
            <Container text fluid>
                <Grid divided="vertically">
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header as="h3">Manoj Vignesh K M</Header>
                            <Social site="Twitter" handle="kmmanojv96" />
                            <Social site="LinkedIn" handle="kmmanoj" />
                            {/* <Button color="twitter" as="a" href="https://twitter.com/kmmanojv96" target="_blank">
                                <Icon name="twitter" /> Twitter
                            </Button> 
                            <Button color="linkedin" as="a" href="https://linkedin.com/in/kmmanoj" target="_blank">
                                <Icon name="linkedin" /> linkedin
    </Button> */}
                        </Grid.Column>

                        <Grid.Column>
                            <div style={{"color": "grey", "textAlign": "right"}}>Web3 enabled</div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
}