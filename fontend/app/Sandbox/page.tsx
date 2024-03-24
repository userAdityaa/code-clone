'use client'

import Editor from '@monaco-editor/react'
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/router';

interface File { 
    name: string;
    language: string;
    value: string
}

interface Files { 
    [key: string]: File;
}

export default function App() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Sandbox />
      </Suspense>
    );
  }



function Sandbox() { 

  
    
    const [htmlCode, setHtmlCode] = useState("");
    const [cssCode, setCssCode] = useState("");
    const [jsCode, setJsCode] = useState("");

  
    const searchParams = useSearchParams();

    const searchQuery = searchParams.get('prop1')

    const [value, setValue] = useState(null)

      

 

    useEffect(() => {
        const Container = async () => {
           const response =  await axios.get(`http://localhost:8000/${searchQuery}`);

        
            setValue(response.data.tech)
            setHtmlCode(response.data.html)
            setCssCode(response.data.css)
            setJsCode(response.data.js)

        }


        Container()
    }, [])


    const files: Files = {
        'style.css': {
          name: 'style.css',
          language: 'css',
          value: cssCode,
        },
        'index.html': {
          name: 'index.html',
          language: 'html',
          value: htmlCode,
        },
        'script.js': {
            name: 'script.js', 
            language: 'javascript', 
            value: jsCode,
        }
      };


    const [fileName, setFileName] = useState("index.html");
    const file = files[fileName];

    const hanldleEditorChange = (e: any) => {
        file.value = e;
        setHtmlCode(files["index.html"].value);
        setCssCode(files["style.css"].value);
        setJsCode(files["script.js"].value);

        
   
        const changeSomething = async (text: any) => {
            await axios.put("http://localhost:8000", {
                html: htmlCode,
                css: cssCode,
                js: jsCode,
                name: `${searchQuery}`
            })
        }

        changeSomething(e)
        
    }

    // console.log(value)

    // console.log(text)


    if (value === 'Html + Css') {
   

    return (
        <>  
            <div className='flex border border-white mt-[4rem]'>
                <div className='flex mt-[1rem] ml-[5rem]'> 
                    <div className='flex flex-col mr-[3rem] space-y-[1rem]'>
                        <button disabled = {fileName === 'index.html'} onClick={() => setFileName('index.html')} className='flex space-x-2'>
                            <Image src='/html.svg' alt='html-logo' height={40} width={40}></Image>
                            <p className='text-zinc-400'>index.html</p>
                        </button>
                        <button disabled={fileName === 'style.css'} onClick={() => setFileName('style.css')} className='flex space-x-2'>
                            <Image src='/css.png' alt='css-logo' height={40} width={40}></Image>
                            <p className='text-zinc-400'>style.css</p>
                        </button>
                    </div>
                </div>
            <Editor
                height="80vh"
                width="50vw"
                theme="vs-dark"
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                saveViewState={true}
                onChange={(e) => hanldleEditorChange(e)}
                className='p-[1rem]'
            />


            

            <div className='bg-white h-[80vh] w-[50vw]'>
            <iframe
          title="output"
          srcDoc={`
            <html>
                <body>${htmlCode}</body>
                <style>${cssCode}</style>
            </html>
            `}
            />
        </div>

        </div>

      

            

            
        </>
    )
    }

    if(value === 'Javascript') {
        return (
            <>  
                <div className='flex border border-white mt-[4rem]'>
                    <div className='flex mt-[1rem] ml-[5rem]'> 
                        <div className='flex flex-col mr-[3rem] space-y-[1rem]'>
                            <button disabled = {fileName === 'index.html'} onClick={() => setFileName('index.html')} className='flex space-x-2'>
                                <Image src='/html.svg' alt='html-logo' height={40} width={40}></Image>
                                <p className='text-zinc-400'>index.html</p>
                            </button>
                            <button disabled={fileName === 'style.css'} onClick={() => setFileName('style.css')} className='flex space-x-2'>
                                <Image src='/css.png' alt='css-logo' height={40} width={40}></Image>
                                <p className='text-zinc-400'>style.css</p>
                            </button>

                            <button disabled={fileName === 'script.js'} onClick={() => setFileName('script.js')} className='flex space-x-2'>
                                <Image src='/js.svg' alt='js-logo' height={40} width={40}></Image>
                                <p className='text-zinc-400'>script.js</p>
                            </button>
                        </div>
                    </div>
                <Editor
                    height="80vh"
                    width="50vw"
                    theme="vs-dark"
                    path={file.name}
                    defaultLanguage={file.language}
                    defaultValue={file.value}
                    saveViewState={true}
                    onChange={(e) => hanldleEditorChange(e)}
                    className='p-[1rem]'
                />

                <div className='bg-white h-[80vh] w-[50vw]'>
                <iframe
              title="output"
              srcDoc={`
                <html>
                    <body>${htmlCode}</body>
                    <style>${cssCode}</style>
                    <script>${jsCode} </script>
                </html>
                `}
                />
            </div>
    
            </div>
    
          
    
                
    
                
            </>
        )
        
    }



}