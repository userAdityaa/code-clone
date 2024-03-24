


export default function Banner() { 
    return (
        <div className="h-[3rem] bg-[#dcff50] w-screen flex items-center">
            <div className="w-[83%] mx-auto flex items-center justify-between">
                <div className="flex space-x-3">
                    <button className=" ml-[1rem] bg-black text-zinc-300 rounded-lg text-[10px]
                    font-lighter px-[0.4rem] py-[0.1rem]">
                        New
                    </button>   

                    <p className="text-[13px] text-black">
                    Introducing CodeSandbox CDE
                    Instant cloud development environments.
                    </p>

                 
                </div>

                <button className="bg-black text-[#dcff50] text-[13px] mr-[3.5rem] px-[0.5rem] py-[0.3rem] rounded-md">Learn more &gt;</button>
            </div>
        </div>
    )
}