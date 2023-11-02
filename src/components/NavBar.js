import LogoPic from "../logo.jpg"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <div className="flex items-center gap-10">
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