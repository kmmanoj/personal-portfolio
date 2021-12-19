import React from "react"
import Navbar from "../components/navbar"
import Summary from "../components/resume/summary"
import Timeline from "../components/resume/timeline"
import { Helmet } from "react-helmet"

const ResumePage = () => {
    return (
        <div>
            <Helmet>
                <title>Manoj Vignesh K M</title>
                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />
            </Helmet>
            <Navbar active="resume" />
            <div className="max-w-7xl mx-auto px-8">
                <h1 className="my-5 border-b-2 w-full md:w-2/12 border-primary text-gray-400">
                    <span className="bg-black px-1 uppercase">Resume</span>
                </h1> 
                <h1 className="text-white text-4xl uppercase font-extrabold">Check my resume</h1>
                <Summary />

                <Timeline />
            </div>
        </div>
    );
}

export default ResumePage;