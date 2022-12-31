import React from "react"
import Fade from 'react-reveal/Fade'
import Navbar from "../components/navbar"
import me from "../images/me.jpg"
import Stats from "../components/about/stats";
import Skills from "../components/about/skills";
import Interests from "../components/about/interests";
import { Helmet } from "react-helmet";
import { Link } from 'gatsby';

const AboutPage = () => {
    return (
        <div>
            <Helmet>
                <title>Manoj Vignesh K M</title>
                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />
            </Helmet>
            <Navbar active="about" />
            <div className="max-w-7xl mx-auto px-8">
                <h1 className="my-5 border-b-2 w-full md:w-2/12 border-primary text-gray-400">
                    <span className="bg-black px-1 uppercase">About</span>
                </h1> 
                <h1 className="text-white text-4xl uppercase">About myself</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center">
                    <Fade bottom cascade distance="100px">
                        <div className="col-span-1">
                            <img src={me} alt="" />
                        </div>
                        <div className="col-span-2 text-white w-full p-10">
                            <p className="text-primary text-3xl my-2">A Cybersecurity engineer</p>
                            <p className="italic text-lg"> who believes in contributing to the world's cybersecurity needs with security hyperautomation <Link className="text-sm text-primary link-underline-active pb-1" to="https://blog.kmmanoj.me/a-note-on-how-viable-is-security-hyperautomation-c951a0d6db37">How?</Link></p>
                            
                            <div className="mt-5 text-lg leading-loose">
                                <div className="flex flex-col">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg> 
                                        Graduate Student at Georgia Institute of Technology
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg> 
                                        Atlanta, Georgia, US
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                        <b>Pursuing</b> MS in Computer Science, Georgia Tech</div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                        </svg>
                                        <b>Graduated</b> BEngg in Computer Science and Engineering, PES Institute of Technology, India</div>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
                
                <Stats />

                <div className="h-10" />

                <h1 className="follow-line my-5 border-b-2 w-2/12 border-primary text-gray-400">
                    <span className="bg-black px-1 uppercase">Skills</span>
                </h1>
                <Skills />
                
                {/* <div className="h-10 my-10">
                    <a href="https://google.com" className="bg-primary rounded-full p-3 text-black">
                        And much more ...
                    </a>
                </div> */}

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
