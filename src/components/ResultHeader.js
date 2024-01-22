import { useState } from 'react'

function ResultFilter() {
    const [year, setYear] = useState(null);
    const [circuit, setCircuit] = useState(null);
}

function ResultHeader() {
    return (
        <div className="w-full">
            <div className="bg-black border-black border-2 rounded-t-lg shadow-lg p-2 mt-10">
                <h1 className="sectionHeader">2023 Race Results</h1>
            </div>
            <div className="flex justify-evenly bg-gradient-to-b from-red-600 to-red-400 rounded-b-lg text-lg">
                <div className="flex items-center gap-3 p-2">
                    <p className="text-white">Year: </p>
                    <select name="year" id="year" className="rounded-lg px-4">
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                </div>
                <div className="flex items-center gap-3 p-2">
                    <p className="text-white">Circuit: </p>
                    <select name="circuit" id="circuit" className="rounded-lg px-4">
                        <option value="abudhabi">Abu Dhabi</option>
                        <option value="silverstone">Silverstone</option>
                    </select>
                </div>
                <div className="flex items-center gap-3 p-2">
                    <p className="text-white">Session: </p>
                    <select name="session" id="session" className="rounded-lg px-4">
                        <option value="grandPrix">Grand Prix</option>
                        <option value="qualifying">Qualifying</option>
                        <option value="q1">Practice 1</option>
                        <option value="q2">Practice 2</option>
                        <option value="q3">Practice 3</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export { ResultHeader }