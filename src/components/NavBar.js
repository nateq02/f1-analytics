import { Logo } from "./Logo"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav className='shadow-lg'>
            <div className="flex h-14 items-center gap-10 ml-6 mt-2">
                <Link to="/">
                    <Logo />
                </Link>
                <Link to="/results" className="h1 hover:underline">
                    Results
                </Link>
                <Link to="/standings" className="h1 hover:underline">
                    Standings
                </Link>
            </div>
        </nav>
    )
}

export { NavBar }