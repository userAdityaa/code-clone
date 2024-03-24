'use client'

import Image from "next/image"
import gsap, { random } from "gsap"
import { useEffect, useRef, useState } from "react"
import React from "react"
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'
import axios from "axios"
import { getCookie } from 'cookies-next'
// import { useRouter } from "next/router"
// import { redirect } from 'next/navigation'



import Link from "next/link"
import { revalidatePath } from "next/cache"
import path from "path"

const buttonValue = [
  {
    name: "Repository", 
    color: "#eaff96", 

  }, 
  {
    name: "Devbox", 
    color: "#eaff96",

  }, 
  {
    name: "Sandbox", 
    color: "#ffffff"
  }
]

const sandbox = [
  {
    index: 1,
    sandbox: "Html + Css" ,
    svg: '/html.svg', 
    desc: 'A template for HTML and CSS',
  }, 

  {
    index: 2, 
    sandbox: 'Javascript', 
    svg: '/js.svg', 
    desc: 'The JavaScript template'
  }, 

  {
    index: 3,
    sandbox: 'React', 
    svg: '/react.svg', 
    desc: 'React example starter project'
  }, 

  {
    index: 4,
    sandbox: 'Typescript', 
    svg: "/ts.svg",
    desc: 'JavaScript and TypeScript example starter project',
  }
]

const homeLinks = ['Recent', 'Settings', 'Invite Members', 'Usage', 'Upgrade']
const repoLinks = ["All Repositories", 'My Contributions']
const devLinks = ['Drafts', 'All folders', 'Recently added']



const Sandbox: React.FC = () => { 

  const [box, setBox] = useState([])
 

  const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); 

  useEffect(() => {
    const getSandbox = async () => {
      const response = await axios.get("http://localhost:8000")
      // console.log(response.data)
      setBox(response.data)
    }

    getSandbox()

  },[])

  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const [selectedSandbox, setSelectedSandbox] = useState(null);

  const [name, setName] = useState(randomName)

  const handleName = (e: any) => {
    e.preventDefault();
    setName(e.target.value)
  }

  // const handleCreate = () => {
  //   revalidatePath("/CreateSandBox")
  //   redirect('/Sandbox')
  // }
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible)
  }

  const handleClick = (index: any) => {
    setSelectedSandbox(index);
    
  };

  const handleClose = () => {
    setSelectedSandbox(null);
    setName(randomName)
  };

  const handleCreateResponse = async (tech: any, name : any) => {
    await axios.post("http://localhost:8000/sandbox", {
      tech: tech, 
      name: name
    })

    window.location.href = `/Sandbox?prop1=${name}`
  }

  

  return(
    <>
    <nav className="flex items-center h-[4rem] w-screen fixed bg-black">
      <div className="flex w-[95%] mx-auto">
        <Image src='/codesand-white.svg' height={20} width={20} alt="code logo"
        className="mr-[55%]"></Image>
        <input type="text" placeholder="  Search in workspace" className="h-[2rem] bg-[#252525] text-[#999999] px-[1rem] mr-[1rem]"/>
        <button className="px-[0.5rem] bg-[#eaff96] rounded-md">
            + Repository
        </button>
        <button className="px-[0.5rem] bg-[#eaff96] ml-[1rem] rounded-md">
            + Devbox
        </button>
        <button className="px-[0.5rem] bg-[#bdb1f6] ml-[1rem] rounded-md"  onClick={togglePopup}>
            + Sandbox
        </button>

        {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="p-8 rounded shadow-lg h-[35rem] w-[50rem] bg-[#151515] relative">
            <div className="flex justify-between text-[#e5e5e5] items-center">
              <p>Create Sandbox</p>
              <button
              onClick={togglePopup}
              
            >
              <Image src='/cross.svg' alt="close icon" height={20} width={20}></Image>
            
            </button>
            </div>

            <div className="flex ">  
              <div className="flex flex-col">
                <input type="text" placeholder="Search template" className="p-[0.4rem] mt-[1.5rem] bg-[#2a2a2a] text-zinc-400"/>
                <p className="text-[#e5e5e5] mt-[1.5rem]">All templates</p>
                <p className="text-zinc-500 mt-[1.5rem]">Official templates</p>
              </div>  

              <div className="text-zinc-300 mt-[1.5rem] ml-[2.5rem]">
                <p>All templates</p>

                <div className="flex flex-wrap justify-start">
                  {
                    sandbox.map((box, index) => 
                      <div key={index} className="bg-[#252525] h-[7rem] w-[12rem] mt-[1.5rem] mr-[1rem] flex flex-col p-[1rem] hover:bg-[#666666aa]" onClick={() => handleClick(index + 1)}>
                        <Image src={box.svg} alt="logo-sandbox" height={25} width={25}></Image>
                        <p className="mt-[0.5rem] text-zinc-300">{box.sandbox}</p>
                        <p className="text-[12px] text-zinc-400">CodeSandbox</p>
                      </div>  
                    )
                  }

            {selectedSandbox && (
              <div className="absolute top-0 left-0 h-[35rem] w-[50rem] bg-[#151515] p-[2rem]">
                  <p onClick={handleClose}>Back</p>

                  <div className="flex mt-[1.5rem]">
                      {sandbox.filter((box) => box.index === selectedSandbox).map((box, index) => 
                      <div key={index} className="flex space-x-5">

                     
                        <div className="flex flex-col w-[12rem]">
                          <Image src={box.svg} alt="logo" height={30} width={30}></Image>
                          <p className="mt-[0.5rem]">{box.sandbox}</p>
                          <p className="text-zinc-500 text-[14px]">CodeSandbox</p>
                          <p className="text-zinc-500 text-[14px]">{box.desc}</p>
                        </div>

                        <div className="flex flex-col">
                          <h1>Create Sandbox</h1>
                          <label htmlFor="name" className="mt-[1.5rem] text-[14px] mb-[0.2rem]">Name</label>
                          <input type="text" value={name} className="w-[32rem] bg-[#2a2a2a]  px-[0.2rem]" onChange={(e) => handleName(e)}/>

                          <div className="flex mt-[20rem] justify-end">
                          <button className="button text-zinc-400 bg-[#2a2a2a] w-[20%] rounded-sm font-medium text-[14px]" onClick={handleClose}>
                            Cancel
                          </button> 
                          <button className="button bg-[#eaff96] py-[0.2rem] ml-[1rem] text-black w-[30%] text-[14px] rounded-sm  font-medium" onClick={() => handleCreateResponse(box.sandbox, name)}>
                          Create Sandbox
                          </button>
                          
                          </div>
                        </div>
                      </div>
                      )}
                  </div>

                  
              </div>        
            )}

                  

                  
                </div>
              </div>
            </div>
            
          </div>
        </div>
        )}
      </div>
    </nav>  


    <section className="w-[20%] fixed top-[4.2rem] h-[46rem] flex flex-col bg-black">
        <div className="flex flex-col mt-[2rem]">
          {homeLinks.map((value, index) => 
            <div key={index} className="p-[0.4rem] text-[#c2c2c2]  w-[80%] mx-auto">
              {value}
            </div>
          )}
        </div>

        <div className="flex flex-col text-[#c2c2c2]  w-[80%] mx-auto p-[0.4rem] mt-[2rem]">
            <p className="mb-[1.5rem]">Repositories</p>
            
            {repoLinks.map((value, index) => 
              <div key={index} className="flex flex-col text-[#c2c2c2] mt-[1rem]">{value}</div>
            )}
        </div>

        <div className="flex flex-col text-[#c2c2c2]  w-[80%] mx-auto p-[0.4rem] mt-[2rem]">
            <p className="mb-[1.5rem]">Devboxes and Sandboxes</p>
            
            {devLinks.map((value, index) => 
              <div key={index} className="flex flex-col text-[#c2c2c2]  mt-[1rem]">{value}</div>
            )}
        </div>

        <p className="text-[#c2c2c2] w-[80%] p-[0.4rem] mx-auto mt-[2rem]">Shared with me</p>
    </section>

    <section className="absolute top-[7rem] left-[20rem] -z-[9999]">
              <h1 className="text-white text-[24px]">Let&apos;s start building</h1>

              <p className="text-zinc-300 mt-[2.5rem]">Get started with CodeSandbox</p>

              {box.length === 0 ? <div></div> :

              <div className="flex">
                
              </div>
              }

              <div className="flex justify-between mt-[1.5rem] h-[10rem] w-[70rem] ">
            
         
                  
                    <div className="relative">
                      <Image src='/docs_getting-started.png' alt="youtube videos" height={10} width={250} className="rounded-md opacity-70" ></Image>

                      <div className="flex absolute w-[13rem] h-[3rem] top-[5rem] left-[1.5rem] items-center">
                        <div className="bg-[#252525] rounded-full h-[2rem] w-[2rem] flex items-center justify-center">
                         <Link href='https://www.youtube.com/watch?v=aSDSpRxkTnY' target="_button"><Image src='/play.svg' alt="play button" height={20} width={20}></Image></Link>
                        </div>
                        <p className="text-white text-[12px] ml-[1rem]">Getting started with CodeSandbox</p>
                      </div>
                      </div>
               
                    <div className="relative">
                      <Image src='/docs_vscode-extension.png' alt="youtube videos" height={10} width={250} className="rounded-md opacity-70" ></Image>

                        <div className="flex absolute w-[13rem] h-[3rem] top-[5rem] left-[1.5rem] items-center">
                          <div className="bg-[#252525] rounded-full h-[2.5rem] w-[4rem] flex items-center justify-center">
                          <Link href='https://www.youtube.com/watch?v=ZJ1sNiTZw5M' target="_button"><Image src='/play.svg' alt="play button" height={20} width={20}></Image></Link>
                          </div>
                          <p className="text-white text-[12px] ml-[1rem]">Working locally with the VS Code Extension</p>
                        </div>
                      </div>


                      <div className="relative">
                        <Image src='/video_code-reviews.png' alt="youtube videos" height={10} width={250} className="rounded-md opacity-70" ></Image>

                        <div className="flex absolute w-[13rem] h-[3rem] top-[5rem] left-[1.5rem] items-center">
                          <div className="bg-[#252525] rounded-full h-[2rem] w-[2rem] flex items-center justify-center">
                          <Link href='https://www.youtube.com/watch?v=dRkpuUMHCNQ' target="_button"><Image src='/play.svg' alt="play button" height={20} width={20}></Image></Link>
                          </div>
                          <p className="text-white text-[12px] ml-[1rem]">Review PRs in CodeSandbox</p>
                        </div>
                      </div>


                      <div className="relative">

                        <Image src='/video_postgres-tutorial.jpg' alt="youtube videos" height={10} width={250} className="rounded-md opacity-70" ></Image>

                        <div className="flex absolute w-[13rem] h-[3rem] top-[5rem] left-[1.5rem] items-center">
                          <div className="bg-[#252525] rounded-full h-[2.5rem] w-[4rem] flex items-center justify-center">
                          <Link href='https://www.youtube.com/watch?v=1ZHrwJHoKOw' target="_button"><Image src='/play.svg' alt="play button" height={20} width={20}></Image></Link>
                          </div>
                          <p className="text-white text-[12px] ml-[0.5rem]">Adding a postgres database to your sandbox</p>
                        </div>

                      </div>




                    </div>
                    


           
         
    </section>

    
    </>



  )
}


export default Sandbox