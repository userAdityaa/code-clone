import React from 'react'
import Button from '../util/Button'
import Image from 'next/image'


const Future = () => {
  return (
    <section className='flex flex-col items-center h-[45rem] '>
        <h1 className='text-white font-sans leading-[7rem] text-[96px] w-[40%] text-center
        '>Join the future of building</h1>

        <button className='button px-[1rem] py-[0.8rem] bg-lime-200 rounded-md font-light text-[16px] mt-[1.5rem]'>
            Start for free
        </button>
        
        <p className='text-[#dcff50] mt-[1.5rem]'>Request demo &gt;</p>

        <Image src='/image.png' alt='footer-image' height={1200} width={1200}></Image>
    </section>
  )
}

export default Future