import { useState, useCallback } from 'react'
import { NavBar } from "../components/NavBar"
import { ResultHeader } from "../components/ResultHeader"
import { ResultBody } from "../components/ResultBody"

// Component for the results page
function Results() {
    // Setting states for the year, circuit, session filters -> not really used as the most recent data is fetched and overrides this
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedCircuit, setSelectedCircuit] = useState('Abu Dhabi Grand Prix');
    const [selectedSession, setSelectedSession] = useState('Race');
    const [loading, setLoading] = useState(true);

    // functions used to handle changes in the filters
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