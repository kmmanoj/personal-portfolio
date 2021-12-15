import React from "react"
import Fade from 'react-reveal/Fade'
import Navbar from "../components/navbar"
import me from "../images/me.jpg"
import Stats from "../components/about/stats";
import Skills from "../components/about/skills";
import Interests from "../components/about/interests";
import { Helmet } from "react-helmet";

const AboutPage = () => {
    return (
        <div>
            <Helmet>
                <title>Manoj Vignesh K M</title>
            </Helmet>
            <Navbar active="about" />
            <div className="max-w-7xl mx-auto px-8">
                <h1 className="follow-line my-5 border-b-2 w-2/12 border-primary text-gray-400">
                    <span className="bg-black px-1 uppercase">About</span>
                </h1> 
                <h1 className="text-white text-4xl uppercase">More stuff</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center">
                    <Fade bottom cascade distance="100px">
                        <div className="col-span-1">
                            <img src={me} alt="" />
                        </div>
                        <div className="col-span-2 text-white w-full p-10">
                            <p className="text-primary text-3xl my-2">A Cybersecurity engineer</p>
                            <p className="italic text-lg"> who believes in contributing to the world's cybersecurity needs with security hyperautomation </p>
                            <div className="mt-5 text-lg leading-loose">
                                <div className="flex flex-col">
                                    <li><b>Currently:</b> Security Engineer at <a href="https://postman.com">Postman</a></li>
                                    <li><b>City:</b> Bengaluru, Karnataka, India</li>
                                    <li><b>Pursuing</b> MS in Computer Science, Georgia Institute of Technology</li>
                                    <li><b>Engineering graduate</b> majored in Computer Science and Engineering from PES Institute of Technology</li>
                                </div>
                            </div>
                            <p className="text-lg mt-5"> A curious and an organized security and software engineer with immense experience in building monitoring and detection systems for on-premise infrastructure and cloud, and developing security testing tools and systems. </p>
                        </div>
                    </Fade>
                </div>
                
                <Stats />

                <div className="h-10" />

                <h1 className="follow-line my-5 border-b-2 w-2/12 border-primary text-gray-400">
                    <span className="bg-black px-1 uppercase">Skills</span>
                </h1>
                <Skills />

                <div className="h-10" />

                <h1 className="follow-line my-5 border-b-2 w-2/12 border-primary text-gray-400">
                    <span className="bg-black px-1 uppercase">Interests</span>
                </h1>
                <Interests />

                <div className="h-20" />
            </div>
        </div>
    )
}

export default AboutPage;
