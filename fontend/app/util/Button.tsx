export default function Button({props, text}:any){ 
    return (
        <button className={`px-[0.4rem] py-[0.3rem] bg-lime-200 rounded-sm font-light text-[13px]`}>
            {props}
        </button>
    )
}