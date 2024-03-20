import { useState, useCallback } from 'react'
import { NavBar } from '../components/NavBar'
import { StandingsHeader } from '../components/StandingsHeader'
import { StandingsBody } from '../components/StandingsBody'

function Standings() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedStandings, setSelectedStandings] = useState('Driver');
    const [loading, setLoading] = useState(true);
    
    const handleYearChange = useCallback((year) => {
        setSelectedYear(year);
    },[])

    const handleStandingsChange = useCallback((standings) => {
        setSelectedStandings(standings);
    },[])

    return (
        <div className="font-default">
            <NavBar /> 
            <div className="w-5/6 mx-auto mb-4">
                <StandingsHeader 
                    selectedYear = {selectedYear}
                    selectedStandings = {selectedStandings}
                    loading = {loading}
                    onYearChange={handleYearChange}
                    onStandingChange={handleStandingsChange}
                    setLoading={setLoading}
                />
                <StandingsBody 
                    selectedYear = {selectedYear} 
                    selectedStandings = {selectedStandings}
                />
            </div>
        </div>
    )
}

export { Standings }