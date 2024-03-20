import { useState, useEffect, useMemo } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { Loading } from './Loading';

function YearFilter({ selectedYear, onChange }) {
    const startYear = 2018;
    const endYear = new Date().getFullYear();

    const years =  useMemo(() => {
        const years = [];
        for (let year = endYear; year >= startYear; year--) {
            years.push(year);
        }
        return years;
    }, [startYear, endYear]);
    
    return (
        <select name="standingYear" id="standingYear" value={selectedYear} onChange={(e) => onChange(e.target.value)} className="rounded-lg px-4">
            {years.map((year) => 
                <option key={year} value={year}>
                    {year}
                </option>)}
        </select>
    )
}

function StandingFilter({ selectedStandings, onChange }) {
    const standings = ['Driver', 'Constructor'];

    return (
        <select name="standingType" id="standingType" value={selectedStandings} onChange={(e) => onChange(e.target.value)} className="rounded-lg px-4">
            {standings.map((standing) =>
                <option key={standing} value={standing}>
                    {standing}
                </option>)}
        </select>
    )
}

function StandingsHeader({ selectedYear, selectedStandings, loading, 
    onYearChange, onStandingChange, setLoading }) {

    const handleYearChange = (year) => {
        onYearChange(year);
    }

    const handleStandingChange = (standing) => {
        onStandingChange(standing);
    }

    // if (loading) return <Loading />;

    return (
        <div className="w-full">
            <div className="bg-black border-black border-2 rounded-t-lg shadow-lg p-2 mt-10">
                <h1 className="sectionHeader">{selectedYear} {selectedStandings} Standings</h1>
            </div>
            <div className="flex justify-evenly bg-gradient-to-b from-red-600 to-red-400 rounded-b-lg text-lg">
                <div className="flex items-center gap-3 p-2">
                    <p className="text-white">Year: </p>
                    <YearFilter selectedYear={selectedYear} onChange={handleYearChange} />
                </div>
                <div className="flex items-center gap-3 p-2">
                    <p className="text-white">Standing Type: </p>
                    <StandingFilter selectedStandings={selectedStandings} onChange={handleStandingChange} />
                </div>
            </div>
        </div>
    )
}

export { StandingsHeader }