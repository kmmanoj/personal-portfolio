import React from "react"
import { RiTestTubeFill, RiFootballLine, RiBugLine, RiMediumLine, RiCodeSSlashFill, RiFootprintLine, RiBitCoinLine, RiStockLine } from "react-icons/ri"

const Interest = (props) => {
    return (
        <div className="w-full text-white flex flex-row items-center justify-items-start">
            <div>{props.icon}</div> 
            <div className="col-span-2 text-xl text-left px-5">{props.text}</div>
        </div>
    )
}

const Interests = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 justify-items-center">
        <div className="grid grid-rows-1 md:grid-rows-2 gap-5 justify-items-center w-full">
            <Interest icon={<RiTestTubeFill size={50} color="yellow"/>} text="Security Research" />
            <Interest icon={<RiFootballLine size={50} color="white" />} text="Soccer" />
        </div>
            <div className="grid grid-rows-1 md:grid-rows-2 gap-5 justify-items-center w-full">
                <Interest icon={<RiBugLine size={50} color="red" />} text="Bug hunting" />
                <Interest icon={<RiMediumLine size={50}/>} text="Blogging" />
            </div>
            <div className="grid grid-rows-1 md:grid-rows-2 gap-5 justify-items-center w-full">
                <Interest icon={<RiCodeSSlashFill size={50} color="green" />} text="Competitive coding" />
                <Interest icon={<RiFootprintLine size={50} color="orange" />} text="Adventure" />
            </div>
            <div className="grid grid-rows-1 md:grid-rows-2 gap-5 justify-items-center w-full">
                <Interest icon={<RiBitCoinLine size={50} color="blue" />} text="Blockchains" />
                <Interest icon={<RiStockLine size={50} color="green" />} text="Market research" />
            </div>
        </div>
    );
}

export default Interests;

