import Image from "next/image"


const container = [
    {
        logo: '/laptop.png', 
        title: 'Use the editor of your choice', 
        description: 'Switch between VS Code and our web editor to keep coding and collaborating without skipping a beat.',
        promotion: 'VS Code Extension'
    },
     
    {
        logo: '/git.svg', 
        title: 'Github integration',
        description: 'Review PRs in record time and get automatic deployment previews.',
        promotion: 'Install our Github App'
    }, 

    {
        logo: '/cube.png', 
        title: 'Pre-configured environments', 
        description: "We use Dev Containers to pre-configure your environments with all the required tools, libraries and dependencies, so you can skip the setup and start coding.", 
        promotion: "Learn more"
    }
]


export default function Extension() { 
    return (
        <section className="flex flex-col h-[55rem] justify-start w-[75vw] mx-auto my-0">
            <h1 className="font-sans text-white text-[38px]">Plug and Play</h1>
            <p className="text-white font-sans text-[96px] leading-[7rem] w-[90%]">Integrate seamlessly with your dev setup.</p>
            <p className="text-zinc-400 text-[24px] mt-[2rem] w-[60%]"> Get all the benefits of cloud development working flawlessly alongside your current setup.</p>

            <div className="flex space-x-5 items-center">
                {container.map((item, index) =>
                <div key = {index} className="border-t border-t-[#dcff50] flex flex-col pt-[1rem] mt-[5rem] w-[24rem] h-[5rem]">
                    <Image src={item.logo} alt="logo" height={30} width={30}></Image>
                    <p className="text-white mt-[1rem] text-[24px] font-sans">{item.title}</p>
                    <p className="text-zinc-400 text-[18px]">{item.description}</p>
                    <p className="text-[#dcff50] mt-[1rem] text-[18px]">{item.promotion} &gt;</p>
                </div>
                 )}
            </div>
        </section>
    )
}