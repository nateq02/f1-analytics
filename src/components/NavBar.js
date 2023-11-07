import LogoPic from "../logo.png"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <div className="flex h-14 items-center gap-10">
                <Link to="/">
                    <img src={LogoPic} className="w-60" alt="logo" />                
                </Link>
                <Link to="/standings" className="h1 hover:underline">
                    Standings
                </Link>
            </div>
        </nav>
    )
}

export { NavBar }