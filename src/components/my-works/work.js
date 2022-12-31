import React from "react"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { FaPenNib, FaBook, FaYoutube } from "react-icons/fa"
import work_list from "./work-list";

import 'react-vertical-timeline-component/style.min.css';

class Works extends React.Component {
    render() {
        let get_icon = (element) => {
            if(element.icon === "blog") {
                return <FaPenNib />;
            } else if(element.icon === "video") {
                return <FaYoutube />;
            }
            return <FaBook />;
        }
        return (
            <div className="bg-black">
                <VerticalTimeline>
                    {work_list.map((element) => {
                        return (
                            <VerticalTimelineElement
                                className={element.icon === "blog"?"vertical-timeline-element--work":"vertical-timeline-element--education"}
                                contentStyle={{ background: '#111', color: '#fff', borderBottom: "0px" }}
                                contentArrowStyle={{ borderRight: '7px solid #111' }}
                                date={element.date}
                                iconStyle={{ background: '#18d26e', color: '#fff' }}
                                icon={get_icon(element)}
                            >
                                <h3 className="vertical-timeline-element-title text-2xl">{element.title}</h3>
                                <p>{element.description}</p>
                                <div className="my-5 text-center">
                                    <a href={element.url} className="bg-secondary-50 text-black p-2 rounded-full hover:bg-primary">Read more</a>
                                </div>
                            </VerticalTimelineElement>
                        );
                    })}
                </VerticalTimeline>
                <div className="my-20"></div>
            </div>
        );
    }
}

export default Works;