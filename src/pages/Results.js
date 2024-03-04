import { useState } from 'react'
import { NavBar } from "../components/NavBar"
import { ResultHeader } from "../components/ResultHeader"
import { ResultBody } from "../components/ResultBody"

function Results() {
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedCircuit, setSelectedCircuit] = useState('Abu Dhabi Grand Prix');
    const [selectedSession, setSelectedSession] = useState('Race');

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
                <ResultBody 
                    selectedYear = {selectedYear}
                    selectedCircuit= {selectedCircuit}
                    selectedSession= {selectedSession}
                />
            </div>
        </div>
    )
}

export { Results }