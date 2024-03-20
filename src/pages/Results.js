import { useState, useCallback } from 'react'
import { NavBar } from "../components/NavBar"
import { ResultHeader } from "../components/ResultHeader"
import { ResultBody } from "../components/ResultBody"

function Results() {
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedCircuit, setSelectedCircuit] = useState('Abu Dhabi Grand Prix');
    const [selectedSession, setSelectedSession] = useState('Race');
    const [loading, setLoading] = useState(true);

    const handleYearChange = useCallback((year) => {
        setSelectedYear(year);
    }, []);

    const handleCircuitChange = useCallback((circuit) => {
        setSelectedCircuit(circuit);
    }, []);

    const handleSessionChange = useCallback((session) => {
        setSelectedSession(session);
    }, []);
    
    return (
        <div className="font-default">
            <NavBar />
            <div className="w-5/6 mx-auto mb-4">
                <ResultHeader 
                    selectedYear = {selectedYear}
                    selectedCircuit = {selectedCircuit}
                    selectedSession = {selectedSession}
                    loading = {loading}
                    onYearChange = {handleYearChange}
                    onCircuitChange = {handleCircuitChange}
                    onSessionChange = {handleSessionChange}
                    setLoading = {setLoading}
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