import { NavBar } from "../components/NavBar"
import { ResultHeader } from "../components/ResultHeader"

function Results() {
    return (
        <div className="font-default">
            <NavBar />
            <div className="w-5/6 mx-auto">
                <ResultHeader />
            </div>
        </div>
    )
}

export { Results }