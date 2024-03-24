'use client'

import { Inter } from "next/font/google"
import gsap from 'gsap'
import { useEffect, useRef } from "react"
import Button from "@/app/util/Button"

const inter = Inter({subsets: ['latin'], 
weight: "400",
})

export default function HomePage() {

    const colorRef = useRef(null)
    const color2Ref = useRef(null)
    const color3Ref = useRef(null)
    
    useEffect(() => {
        gsap.fromTo(colorRef.current, 
            { color: "transparent", autoAlpha: 0 }, 
            { duration: 3, color: "#d6fb41", autoAlpha: 1 });

        gsap.fromTo(color2Ref.current, 
            { color: "transparent", autoAlpha: 0 }, 
            { duration: 3, color: "#c2c2c2", autoAlpha: 1 });
        
        gsap.fromTo(color3Ref.current, 
            { opacity:0 , autoAlpha: 0 }, 
            { duration: 3,opacity:1 , autoAlpha: 1 });
        
    }, []);

    return (
        <section className="h-[37rem] py-[5rem] px-[7.6rem] flex flex-col space-y-[2rem] bg-[#161616]">
            <div className="flex flex-col w-[60%]">
                <p ref={colorRef}  className={`text-[#d6fb41] text-[110px] font-${inter} font-semibold leading-[7.5rem]`}>Instant cloud <span className="text-[#f5ffcb]">development</span></p>
            </div>

            <p className="text-zinc-300 text-[24px] w-[59%]" ref={color2Ref}>CodeSandbox gives you 24/7 collaborative cloud development environments (CDEs) that resume in 2 seconds.</p>
            
            <div className="flex space-x-[2rem] items-center" ref={color3Ref}>
                <button className={`px-[1rem] py-[0.9rem] bg-lime-200 font-light text-[13px] rounded-md`}>
                Start for free
                </button>

                <p className="text-zinc-400 text-[18px]">Schedule a demo &gt;</p>
            </div>
        </section>
    )
}