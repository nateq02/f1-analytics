import { useState } from 'react'
import { NavBar } from "../components/NavBar"
import { ResultHeader } from "../components/ResultHeader"

function Results() {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedCircuit, setSelectedCircuit] = useState('');
    const [selectedSession, setSelectedSession] = useState('');

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const handleCircuitChange = (circuit) => {
        setSelectedCircuit(circuit);
    }

    const handleSessionChange = (session) => {
        setSelectedSession(session);
    }

    return (
        <div className="font-default">
            <NavBar />
            <div className="w-5/6 mx-auto">
                <ResultHeader 
                    selectedYear = {selectedYear}
                    selectedCircuit = {selectedCircuit}
                    selectedSession = {selectedSession}
                    onYearChange = {handleYearChange}
                    onCircuitChange = {handleCircuitChange}
                    onSessionChange = {handleSessionChange}
                />
            </div>
        </div>
    )
}

export { Results }