import React from "react"
import { Link } from "gatsby"
import Fade from "react-reveal/Fade"
import { GoogleScholar, Linkedin, Twitter, Github } from "../components/commons/brand-site";
import backgroundImage from '../images/bg.jpg';
import { Helmet } from "react-helmet";
import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';

const IndexPage = () => {
    let active = "home";
    return (
        <div>
            <Helmet>
                <title>Manoj Vignesh K M</title>
                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />
            </Helmet>
            <div className="h-screen w-screen" style={{backgroundImage: `url(${backgroundImage})`}}>
                <Fade bottom cascade>
                    <div className="max-w-7xl mx-auto flex flex-col h-screen justify-center">
                        <div className="text-white m-2 md:m-0 text-7xl font-bold">Manoj Vignesh K M</div>
                        <div className="text-white m-2 md:m-0 text-2xl py-5 pl-10">
                            an ambitious 
                            <Popup 
                                trigger={<span className="highlighted pb-1"> cybersecurity engineer </span>} 
                                position="bottom center" 
                                closeOnDocumentClick 
                                on={['hover', 'focus']}
                            >
                                <div>You know it!</div>
                            </Popup>
                             and a
                            <Popup 
                                trigger={ <span className="highlighted pb-1"> digitoolsmith </span>} 
                                position="bottom center" 
                                closeOnDocumentClick 
                                on={['hover', 'focus']}
                            >
                                <div>Such as an exploit developer, exploitation platform developer</div>
                            </Popup>
                        </div>
                        <div className="flex items-baseline mx-4 md:mx-0 md:space-x-10 flex-col md:flex-row">
                            <Link
                                className={"text-white py-2 text-base font-medium " + (active==="home"?"link-underline-active":"link-underline")}
                                to="/"
                                >
                                Home
                            </Link>
                            <Link
                                className={"text-white hover:opacity-100 py-2 text-base font-medium " + (active==="about"?"link-underline-active":"link-underline")}
                                to="/about"
                                >
                                About
                            </Link>
                            <Link
                                className={"text-white hover:opacity-100 py-2 text-base font-medium " + (active==="resume"?"link-underline-active":"link-underline")}
                                to="/resume"
                                >
                                Resume
                            </Link>
                            <Link
                                className={"text-white hover:opacity-100 py-2 text-base font-medium " + (active==="my-works"?"link-underline-active":"link-underline")}
                                to="/my-works"
                                >
                                My Works
                            </Link>
                        </div>
                        <div className="flex space-x-4 m-4 md:mx-0">
                            <Twitter slug="kmmanojv96" />
                            <Linkedin slug="kmmanoj" />
                            <Github slug="kmmanoj" />
                            <GoogleScholar slug="kmAjxWMAAAAJ" />
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default IndexPage
