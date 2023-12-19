import LogoPic from "../logo.png"

function Logo() {
    return (
        <div className='w-300 h-12 ml-16 flex items-center'>
            <img src={LogoPic} className="h-full" alt="logo" />                
            <h1 className='ml-3 h1 text-3xl'>F1 Analytics</h1>
        </div>
    )
}

export { Logo }