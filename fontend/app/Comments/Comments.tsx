'use client'

import { useEffect, useRef } from "react"
import gsap from 'gsap'
import commentsData from './jsonComments.json'

const Comment = ({ comment }: any) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = containerRef.current;
        if(element) { 
            const width = window.innerWidth; 
            gsap.fromTo(element, {
                x: width, 
            }, {
                x: -width, 
                duration: 20, 
                repeat: -1, 
                ease: 'none',
            })
        }
    }, []);

    return (

        <div className="flex flex-col flex-shrink-0 h-[20rem] bg-[#d6fb41] w-[35rem] rounded-lg p-[3rem] relative" ref={containerRef}>
            <p className="text-[24px] font-sans">{comment.content}</p>
            <div className="absolute bottom-10 flex">
                <div className="bg-white rounded-full h-[3rem] w-[3rem]"></div>
                <div className="flex flex-col ml-[1rem]">
                    <p>{comment.author}</p>
                    <p>{comment.tech_job}</p>
                </div>  
            </div>
        </div>
       
    )
}

export default function Comments() {
    return (
        <section className="h-[40rem] w-screen flex flex-col space-y-5">
            <div className="flex space-x-5">
                {commentsData.comments.map((comment, index) => 
                    <Comment key={index} comment={comment} />
                )}
            </div>
        </section>
    );
}