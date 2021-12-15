import React from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import Zoom from 'react-reveal/Zoom'

const Skill = (props) => {
    return (
        <Zoom>
            <div className="w-full">
                <p className="text-white uppercase text-sm">{props.skill}</p>
                <ProgressBar completed={props.value} animateOnRender={true} bgColor="#18d26e" baseBgColor="#555" isLabelVisible={false} height="10px" borderRadius={0} />
            </div>
        </Zoom>
    )
}

const Skills = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
            <div className="grid grid-rows-1 md:grid-rows-3 gap-5 justify-items-center w-full">
                <Skill skill="Linux" value={98} />
                <Skill skill="Dockers" value={97} />
                <Skill skill="AWS" value={95} />
            </div>
            <div className="grid grid-rows-1 md:grid-rows-3 gap-5 justify-items-center w-full">
                <Skill skill="Burpsuite, Wireshark &amp; other security tools" value={90} />
                <Skill skill="Infrastructure &amp; Cloud Security" value={90} />
                <Skill skill="Web application security" value={80} />
            </div>
            <div className="grid grid-rows-1 md:grid-rows-3 gap-5 justify-items-center w-full">
                <Skill skill="Python" value={98} />
                <Skill skill="Javascript" value={90} />
                <Skill skill="Java" value={80} />
            </div>
        </div>
    )
}

export default Skills;