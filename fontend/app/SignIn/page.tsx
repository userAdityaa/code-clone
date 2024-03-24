'use client'

import React from 'react'
import Image from 'next/image'
import axios from 'axios'



const button = [
  {
    logo: '/google.svg', 
    sign: 'Sign in with Google', 

  }, 
  {
    logo: '/apple.svg', 
    sign: 'Sign in with Apple',
  }
]

const SignIn = () => {

  // const handleSignIn = ({
  //   // try { 
  //   //   const response = await axios.get('http://localhost:8000/auth/google/callback')
  //   //   console.log(response)
  //   // }
  //   // catch(err) { 
  //   //   console.log(err)
  //   // }

  //     window.location.href = 'http://localhost:8000/auth/google/callback';
    
  // })

  const handleSignIn = () => { 
    window.location.href = 'http://localhost:8000/auth/google';
}
  
  return (
    <section className='flex flex-col items-center'>
      <h1 className='font-sans text-[50px] w-[20%] text-center leading-tight text-white mt-[5rem]'>Sign in to CodeSandbox</h1>
      <p className='text-zinc-500 text-[18px] mt-[1rem]'>Login or register to start building your projects today.</p>
      <button className='button px-[9rem] py-[0.8rem] bg-[#edffa5] rounded-md flex items-center space-x-2 mt-[4rem]' >
        <Image src='/git-black.svg' alt='git-logo' height={20} width={20}></Image>
        <p>Sign in with Github</p>
      </button> 

      <div className='flex mt-[1rem] space-x-5'>
          {/* {button.map((button,index) =>  */}
   
              <button className='button bg-[#2a2a2a] flex space-x-5 px-[1.2rem] py-[0.8rem] rounded-md' onClick={handleSignIn}>
                <Image src='/google.svg' alt='logo' height={20} width={20} className='fill-black'>
   
                </Image>
                <p className='text-zinc-400'>Sign in with Google</p>
              </button>

              <button className='button bg-[#2a2a2a] flex space-x-5 px-[1.2rem] py-[0.8rem] rounded-md' >
              <Image src='/apple.svg' alt='logo' height={20} width={20} className='fill-black'>

              </Image>
              <p className='text-zinc-400'>Sign in with Apple</p>
              </button>
              
          {/* )} */}

      </div>
    </section>  
  )
}

export default SignIn