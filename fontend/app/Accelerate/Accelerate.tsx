'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Accelerate() {
    
    const [imageSrc, setImageSrc] = useState('/git.png')
    const progressRef = useRef(null);
    const progress2Ref = useRef(null);
    const progress3Ref = useRef(null);
    const imageRef = useRef(null);
    const leftImageRef = useRef<HTMLImageElement | null>(null);
    let originalRect : any;

    

    useEffect(() => {
        gsap.to(progressRef.current, {width: '100%', duration: 7, scrollTrigger: {
            trigger: imageRef.current, 
            start: 'top-=100 center', 
        }, 
        onComplete: () => {
            gsap.set(progressRef.current, {width: '0%'});
            setImageSrc('/review.jpeg');
            gsap.to(progress2Ref.current, {width: '100%', duration: 7, scrollTrigger: {
                trigger: imageRef.current, 
                start: 'top-=100 center', 
            }, 
            onComplete: () => {
                gsap.set(progress2Ref.current, {width: '0%'});
                setImageSrc('/draw.png');
                gsap.to(progress3Ref.current, {width: '100%', duration: 7, scrollTrigger: {
                    trigger: imageRef.current, 
                    start: 'top-=100 center', 
                }});
            }});
        }});

        gsap.to(leftImageRef.current, {
            scrollTrigger: {
                trigger: leftImageRef.current,
                start: 'top-=50 top', 
                end: 'bottom-=300 center+=100', 
                // markers: true,
                
                onEnter: () => {
                    if(leftImageRef.current) {
                        originalRect = leftImageRef.current.getBoundingClientRect();
                        gsap.set(leftImageRef.current, {
                            position: 'fixed',
                            top: originalRect.top + 'px',
                            left: originalRect.left + 'px'
                        });
                    }
                },
                // onEnterBack: () => {
                //     if(leftImageRef.current) {
                //         gsap.set(leftImageRef.current, {
                //             position: 'absolute',
                //             top: originalRect.top + 'px',
                //             left: originalRect.left + 'px'
                //         });
                //     }
                // },
                onLeave: () => {
                    if(leftImageRef.current && originalRect) {
                        gsap.set(leftImageRef.current, {
                            position: 'absolute',
                            top: originalRect.top + 'px',
                            left: originalRect.left + 'px'
                        });
                    }
                },
            }
        });
        
               
     } , []);


    return (
        <section className="bg-black h-[100rem] flex flex-col items-center mt-[8rem]">
            <Image src='/workflow.png' alt="workflow" height={80} width={80}></Image>

            <p className="text-white font-serif text-[96px] w-[60%] text-center leading-[7rem]"> Accelerate
            your git workflow.
            </p>

            <p className="text-zinc-400 text-[24px] mt-[2rem] w-[50%] text-center">Shorten the review cycle with an all-in-one platform for efficient code reviews.</p>

            <div className="flex justify-between mt-[6rem] h-[55rem] w-[85%] relative" ref={imageRef}>
       
                <Image src={imageSrc} alt="review screen" height={900} width={900} className="absolute top-[2rem] -left-[10rem]"
                ref={leftImageRef}></Image>

                <div className="absolute flex flex-col top-0 right-0 h-[46rem] w-[22rem]">
                    {/* <h1 className="text-white">Hello World</h1>
                     */}
                    <div className="bg-zinc-900 h-1 relative rounded-md flex flex-col">
                        <div className="absolute bg-[#e3ff73] top-0 left-0 h-1 rounded-md" ref={progressRef}>
                        </div>

                        <Image src='/link.png' alt="link-icon" height={30} width={30} className="mt-[1.2rem]"></Image>

                        <p className="text-zinc-200 text-[22px] mt-[1.5rem]">Every PR and branch is a URL</p>

                        <p className="text-zinc-400 mt-[1.5rem]">Get a cloud dev environment for every PR that starts in 2 seconds and integrates all code review tooling into a single platform.</p>
                    </div>

                    <div className="bg-zinc-900 h-1 relative rounded-md flex flex-col top-[18rem]">
                        <div className="absolute bg-[#e3ff73] top-0 left-0 h-1 rounded-md" ref={progress2Ref}>
                        </div>

                        <Image src='/timer.png' alt="link-icon" height={30} width={30} className="mt-[1.2rem]"></Image>

                        <p className="text-zinc-200 text-[22px] mt-[1.5rem]">Every PR and branch is a URL</p>

                        <p className="text-zinc-400 mt-[1.5rem]">Get a cloud dev environment for every PR that starts in 2 seconds and integrates all code review tooling into a single platform.</p>
                    </div>

                    <div className="bg-zinc-900 h-1 relative rounded-md flex flex-col top-[38rem]">
                        <div className="absolute bg-[#e3ff73] top-0 left-0 h-1 rounded-md" ref={progress3Ref}>
                        </div>

                        <Image src='/icons-lime.png' alt="link-icon" height={30} width={30} className="mt-[1.2rem]"></Image>

                        <p className="text-zinc-200 text-[22px] mt-[1.5rem]">Every PR and branch is a URL</p>

                        <p className="text-zinc-400 mt-[1.5rem]">Get a cloud dev environment for every PR that starts in 2 seconds and integrates all code review tooling into a single platform.</p>
                    </div>
                </div>  

                
         
            </div>  

        </section>  
    )
}