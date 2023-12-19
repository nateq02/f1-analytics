import { Logo } from "./Logo"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <div className="flex h-14 items-center gap-10 ml-4 mt-2">
                <Link to="/">
                    <Logo />
                </Link>
                <Link to="/standings" className="h1 hover:underline">
                    Standings
                </Link>
            </div>
        </nav>
    )
}

export { NavBar }