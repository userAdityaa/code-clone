import React from 'react'
import Image from 'next/image'
import Button from './util/Button'
import Link from 'next/link'

const links = ['Features', 'Use Cases', 'Resources', 'Docs', 'Support', 'Enterprise', 'Pricing']

const NavBar = () => {
  return (
    <nav className='bg-black h-[3rem] w-[83%] mx-auto p-2 flex items-center'>
        
        <img src="./codesandbox.svg" alt=""  className='fill-white h-[1.7rem] mx-3'/>

        <ul className='flex justify-between w-[40%] ml-[2rem]'>
            {links.map((link, index) => 
                <li key={index} className='text-zinc-500 text-[13px] hover:text-zinc-400'>{link}</li>
            )}
        </ul>

        <div className='flex space-x-5'>
            <button className='ml-[27rem] text-zinc-500 text-[13px]'>
              <Link href='/SignIn'>Sign In</Link></button>
             <Button props='Try for free'/>
        </div>
    </nav>
  )
}

export default NavBar