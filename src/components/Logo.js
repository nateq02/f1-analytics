import LogoPic from "../imgs/logo.png"

function Logo() {
    return (
        <div className='w-300 h-10 flex items-center justify-center'>
            <img src={LogoPic} className="h-full" alt="logo" />                
            <h1 className='ml-3 h1'>F1 Analytics</h1>
        </div>
    )
}

export { Logo }