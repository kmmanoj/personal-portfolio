import { useState } from "react";
import { Container, Header, Message, Icon, Button } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

function getLastWeb3curiosity() {
    let curious = localStorage.getItem("web3curiosity");
    return !curious;
}

function setLastWeb3curiosity() {
    localStorage.setItem("web3curiosity", false);
}

export default function Introduction() {
    let [web3curiosity, setWeb3curiosity] = useState(getLastWeb3curiosity());

    let web3curiosityMsg = (
        <Message attached='bottom' info>
            <Icon name='info' />
            Curious how <u><a href="https://web3.kmmanoj.me">my portfolio in web3</a></u> feels like?
            <Button color="red" size="mini" style={{margin: "0px 10px", padding: "5px"}}onClick={() => {
                setWeb3curiosity(false);
                setLastWeb3curiosity();
            }}>Don't show this again!</Button>
        </Message>
    );
    
    return (
        <div style={{"padding": "2% 0"}}>
            <Container text>
                <Header as="small">I'm</Header>
                <p style={{"paddingTop": "10px"}}>
                    Manoj Vignesh K M, a cybersecurity researcher with a provable experience in network security and web application security. I also possess immense experience in building monitoring, alerting and inventory management system for a heterogenous system of network devices.
                </p>
                <p>
                    Check out my <a href="https://blog.kmmanoj.me" target="_blank" rel="noreferrer">blog articles</a> where I explain claims and concepts by application.
                </p>
                {web3curiosity?web3curiosityMsg:<div></div>}
            </Container>
        </div>
    );
}