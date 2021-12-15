import React, { useState } from 'react';
import Fade from "react-reveal/Fade"
import { Link } from "gatsby";

const Navbar = (props) => {
const [openMenu, setOpenMenu] = useState(false)
let active = props.active;
return (
    <nav className="bg-transparent">
    <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between h-16">
        <Fade top cascade>
            <div className="w-full justify-between flex items-center">
                <a className="text-white text-2xl md:text-4xl flex-shrink-0 font-poppins" href="/">
                Manoj Vignesh K M
                </a>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                            className={"text-white py-2 text-base font-medium font-poppins " + (active==="home"?"link-underline-active":"link-underline")}
                            to="/"
                            >
                            Home
                        </Link>
                        <Link
                            className={"text-white py-2 text-base font-medium font-poppins " + (active==="about"?"link-underline-active":"link-underline")}
                            to="/about"
                            >
                            About
                        </Link>
                        <Link
                            className={"text-white py-2 text-base font-medium font-poppins " + (active==="resume"?"link-underline-active":"link-underline")}
                            to="/resume"
                            >
                            Resume
                        </Link>
                        <Link
                            className={"text-white py-2 text-base font-medium font-poppins " + (active==="my-works"?"link-underline-active":"link-underline")}
                            to="/my-works"
                            >
                            My Works
                        </Link>
                    </div>
                </div>
            </div>
        </Fade>
        <div className="-mr-2 flex md:hidden">
            <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-white hover:text-primary inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
            <svg
                width="20"
                height="20"
                fill="white"
                className="h-8 w-8"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
            </svg>
            </button>
        </div>
        </div>
    </div>
    {openMenu && (
        <div className="md:hidden">
        <div className="md-px-2 pt-2 pb-3 space-y-1 flex flex-col sm:px-3">
            <Link
            className={"text-white mx-3 py-2 w-2/12 text-base font-medium font-poppins " + (active==="home"?"link-underline-active":"link-underline")}
            to="/"
            >
            Home
            </Link>
            <Link
            className={"text-white mx-3 py-2 w-2/12 text-base font-medium font-poppins " + (active==="about"?"link-underline-active":"link-underline")}
            to="/about"
            >
            About
            </Link>
            <Link
            className={"text-white mx-3 py-2 w-2/12 text-base font-medium font-poppins " + (active==="resume"?"link-underline-active":"link-underline")}
            to="/resume"
            >
            Resume
            </Link>
            <Link
            className={"text-white mx-3 py-2 w-4/12 text-base font-medium font-poppins " + (active==="my-works"?"link-underline-active":"link-underline")}
            to="/my-works"
            >
            My Works
            </Link>
        </div>
        </div>
    )}
    </nav>
)
}

export default Navbar