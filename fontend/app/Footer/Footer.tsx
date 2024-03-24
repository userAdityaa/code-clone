import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='h-[30rem] bg-[#161616] flex justify-center'>
        <div className='flex w-[83%]'>
            <Image src='/codesandbox.svg' alt='logo' height={25} width={25}className='absolute mt-[3rem]'></Image>

            <div className='flex absolute right-[10rem] mt-[3rem] space-x-[5rem]'>
                <div className='flex flex-col space-y-5'>

                    <p className='text-zinc-400'>Use Cases</p>

                    <ul className='text-zinc-500 flex flex-col space-y-5'>
                        <li>Cloud Dev Environments</li>
                        <li>Code Reviews</li>
                        <li>Code in Sandboxes</li>
                        <li>Learn & Experiment</li>
                        <li>Coding Exercises</li>
                        <li>Instant Feedback</li>
                    </ul>

                </div>  

                <div className='flex flex-col space-y-5'>

                    <p className='text-zinc-400'>Ecosystem</p>

                    <ul className='text-zinc-500 flex flex-col space-y-5'>
                        <li>Features</li>
                        <li>VS Code Extension</li>
                        <li>SandPack</li>
                        <li>Learn & Experiment</li>
                        <li>Coding Exercises</li>
                        <li>Instant Feedback</li>
                    </ul>

                </div>  

                <div className='flex flex-col space-y-5'>

                    <p className='text-zinc-400'>Company</p>

                    <ul className='text-zinc-500 flex flex-col space-y-5'>
                        <li>About</li>
                        <li>Support</li>
                        <li>Careers</li>
                        <li>Brand Kit</li>
                        
                    </ul>

                </div> 
            </div>
        </div>
    </footer>
  )
}

export default Footer