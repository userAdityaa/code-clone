
const container = [{
    logo: '/cloud-purple.png', 
    title: 'Faster than local', 
    description: 'Get rid of slow build times and time lost in context-switching. Our powerful VMs run your code up to 200x faster than local and resume any project in 2 seconds.'}, 

    {logo: '/tick.png', 
    title: 'Works on everyone’s machine', 
    description: 'Instead of putting each developer\'s machine in the cloud, we run each branch on a centralized CDE that gives everyone the same experience.'}, 

    {logo: '/group.png', 
    title: 'Collaborative 24/7', 
    description: 'CodeSandbox is the only fully collaborative CDE. Your entire team can connect to the same environment and code live, together, anytime.'}, 

    {logo: '/secure.png', 
    title: 'Reliable and secure', 
    description : 'We keep your code always private and secure. You get flexible permissions, access control, security monitoring, private npm, and more.'}
]

export default function Environment() { 
    return (
        <section className="bg-black h-[55rem] flex flex-col items-center mt-[7rem]">
            <div>
                <img src="/code.png" alt="" />
            </div>

            <div className="font-serif text-white text-[96px] w-[60%] text-center leading-[7rem]">
                One environment for the whole team.
            </div>

            <div className="text-zinc-500 text-[28px] w-[50%] text-center mt-[2rem]"> 
                Get always consistent development environments that boost productivity and empower collaboration.
            </div>

            <div className="mt-[5rem]">
                <div className="flex">
                {container.map((item, index) => 
                    <div key={index} className="flex flex-col items-center">
                        <div className="rounded-full bg-[#7b61ff59] w-[8rem] h-[8rem] flex items-center justify-center">
                            <img src={item.logo} alt="" className="fill-purple h-[4rem]"/>
                            
                        </div>

                        <p className="text-zinc-300 text-[20px] mt-[1rem]">{item.title}</p>

                        <div className="text-zinc-500 w-[90%] text-center mt-[1rem]">
                        {item.description}
                        </div>
                    </div>
          
                )}
                </div>
            </div>

            <p className="text-[#e3ff73] mt-[2rem]">Start for free &gt;</p>
        </section>
    )
}