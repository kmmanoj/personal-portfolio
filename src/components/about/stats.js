import React from "react";
import Fade from 'react-reveal/Fade';
import CountUp from "react-countup";

const Stat = (props) => {
    return (
        <Fade bottom cascade distance="100px">
            <div className={"w-full h-40 my-5 rounded-xl flex flex-col items-center " + props.moreClasses}>
                <div className="rounded-full p-4 bg-black text-white">
                    {props.svg}
                </div>
                <p className="p-2 rounded-xl w-3/4 text-center text-4xl text-white">
                    <CountUp 
                        delay={0.5}
                        end={props.count}
                        duration={0.5}
                        suffix={props.suffix}
                    />
                </p>
                <p className="text-base text-gray-300">
                    {props.text}
                </p>
            </div>
        </Fade>
    );
}

const Stats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 justify-items-center">
            <Stat 
                svg={<svg className="h-8 w-8"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />  
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>}
                count={4}
                suffix=""
                text="Years of experience"
            />
            <Stat 
                svg={<svg className="h-8 w-8"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>}
                count={200}
                suffix="K USD per year"
                moreClasses="col-span-2"
                text="Best aggregate business expense saved"
            />
            <Stat 
                svg={<svg className="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                    </svg>}
                count={11}
                suffix="K+"
                text="Lines of code"
            />
        </div>
    )
}

export default Stats;