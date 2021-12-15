import React from "react"
import Navbar from "../components/navbar"
import Works from "../components/my-works/work"
import { Helmet } from "react-helmet"

const MyWorksPage = () => {
    return (
        <div>
            <Helmet>
                <title>Manoj Vignesh K M</title>
            </Helmet>
            <Navbar active="my-works" />
            <div className="max-w-7xl mx-auto px-8">
                <h1 className="follow-line my-5 border-b-2 w-4/12 border-primary text-gray-400">
                    <span className="bg-black px-1 uppercase">Blogs &amp; Academic Research</span>
                </h1> 
                <h1 className="text-white text-4xl uppercase">My Works</h1>
                <Works />
            </div>
        </div>
    )
}

export default MyWorksPage;