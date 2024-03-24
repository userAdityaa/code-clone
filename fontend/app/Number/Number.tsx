'use client'

import CountingAnimation from "../Counter/Counter";
import { useEffect, useRef } from "react";


export default function Numbers() {

    return (
        <section className="h-[58rem] bg-[#e3ff73] flex flex-col items-center trigger-div">
            <div className="mt-[8rem]">
                <img src="/cloud.png" alt="" className="h-[7rem]"/>
            </div>

            <div className="text-[96px] w-[60%] text-center leading-tight font-serif">
                <p>Meet a CDE that makes an impact</p>
            </div>

            <div className="w-[75%] flex justify-between mt-[1.5rem]">

                <div className="flex flex-col">
                    <div className=" mt-[2.5rem]">
                        <div className="border-[0.2rem] border-black "></div>
                        <div className="w-[15rem] h-[8rem] flex space-x-5 items-center">
                            <CountingAnimation targetValue={5} triggerSelector=".trigger-div"/>
                            <div className="text-[8rem] font-serif">+</div>
                        </div>
                    </div>
                    <p className="mt-[1.5rem] font-serif text-[24px]">hours saved</p>
                    <p className="mt-[0.4rem]">per developer, per week</p>
                </div>

                <div className="flex flex-col">
                    <div className=" mt-[2.5rem]">
                        <div className="border-[0.2rem] border-black "></div>
                        <div className="w-[15rem] h-[8rem] flex space-x-5 items-center">
                            <CountingAnimation targetValue={90} triggerSelector=".trigger-div"/>
                            <div className="text-[8rem] font-serif">%</div>
                        </div>
                    </div>
                    <p className="mt-[1.5rem] font-serif text-[24px]">reduction</p>
                    <p className="mt-[0.4rem]">in dev onboarding time</p>
                </div>

                <div className="flex flex-col">
                    <div className=" mt-[2.5rem]">
                        <div className="border-[0.2rem] border-black "></div>
                        <div className="w-[15rem] h-[8rem] flex space-x-5 items-center">
                            <CountingAnimation targetValue={60} triggerSelector=".trigger-div"/>
                            <div className="text-[8rem] font-serif">%</div>
                        </div>
                    </div>
                    <div className="w-[30%] mt-[0.4rem]">of cloud workloads</div>
                </div>

                
            </div>

            <button className="button bg-black text-[#e3ff73] px-[0.8rem] py-[0.9rem] rounded-lg mt-[4rem]">Learn more about CDEs &gt;</button>
        </section>  
    )
}