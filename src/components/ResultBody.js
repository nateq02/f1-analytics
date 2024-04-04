import { useState, useEffect } from 'react';
import { formatTime } from './LastRaceResults'
import axios from 'axios';
import alpineLogo from '../imgs/small-logos/alpine.png';
import astonLogo from '../imgs/small-logos/aston.png';
import ferrariLogo from '../imgs/small-logos/ferrari.png';
import haasLogo from '../imgs/small-logos/haas.png';
import mclarenLogo from '../imgs/small-logos/mclaren.png';
import mercedesLogo from '../imgs/small-logos/mercedes.png';
import kickLogo from '../imgs/small-logos/kick.png';
import redBullLogo from '../imgs/small-logos/redbull.png';
import rbLogo from '../imgs/small-logos/rb.png';
import williamsLogo from '../imgs/small-logos/williams.png';
import alphaTauriLogo from '../imgs/small-logos/alphatauri.png';
import alfaRomeoLogo from '../imgs/small-logos/alfaromeo.png';
import racingPointLogo from '../imgs/small-logos/racingpoint.png';
import renaultLogo from '../imgs/small-logos/renault.png';
import toroRossoLogo from '../imgs/small-logos/tororosso.png'
import sauberLogo from '../imgs/small-logos/sauber.png';
import forceIndiaLogo from '../imgs/small-logos/forceindia.png';

// An object to store team names and their corresponding logos
const teamLogos = {
    'Alpine': alpineLogo,
    'Aston Martin': astonLogo,
    'Ferrari': ferrariLogo,
    'Haas F1 Team': haasLogo,
    'McLaren': mclarenLogo,
    'Mercedes': mercedesLogo,
    'Red Bull Racing': redBullLogo,
    'RB': rbLogo,
    'Williams': williamsLogo,
    'Kick Sauber': kickLogo,
    'AlphaTauri': alphaTauriLogo,
    'Alfa Romeo': alfaRomeoLogo,
    'Alfa Romeo Racing': alfaRomeoLogo,
    'Racing Point': racingPointLogo,
    'Renault': renaultLogo,
    'Toro Rosso': toroRossoLogo,
    'Sauber': sauberLogo,
    'Force India': forceIndiaLogo
}

function getTeamLogo(teamName) {
    return teamLogos[teamName] || null;
}

// Component to format a row in the race results table
function RaceResultRow({ driver }) {
    if (driver){
        return (
            <tr key={driver.Abbreviation} className="border-b-red-600 border-b-[1px] shadow-sm last:border-b-0">
                <td className="py-2">{driver.ClassifiedPosition}</td>
                <td className="py-2">{driver.FullName}</td>
                <td className="py-2 flex justify-center items-center">
                    <img src={getTeamLogo(driver.TeamName)} alt={driver.TeamName + ' Logo'} className="h-8 mr-3"/>
                    {driver.TeamName}
                </td>
                <td className="py-2">{formatTime({ data: driver })}</td>
                <td className="py-2">{driver.Points}</td>
            </tr>
        )
    }
    // If there is no data, output that no data is available
    else {
        return (<div>Data Unavailable</div>)
    }
}

// Formats qualifying time so that they are consistently formatted, returns "--" if no qualifying time exists for a driver
    // Times are given in total seconds
function formatQualifyingTime({ time }) {
    if (time){
        const min = Math.floor(time / 60);
        const secs = Math.round(time % 60);
        const ms = Math.round((time % 1) * 1000);
        return `${min}:${secs < 10 ? `0${secs}`: `${secs}`}:${ms < 10 ? `00${ms}`: ms < 100 ? `0${ms}`: ms}`
    }
    else return '--'
}

// Component to store a row of qualifying results
function QualifyingResultRow({ driver }) {
    if (driver) {
        return (
            <tr key={driver.Abbreviation} className="border-b-red-600 border-b-[1px] shadow-sm last:border-b-0">
                <td className="py-2">{driver.Position}</td>
                <td className="py-2">{driver.FullName}</td>
                <td className="py-2 flex justify-center items-center">
                    <img src={getTeamLogo(driver.TeamName)} alt={driver.TeamName + ' Logo'} className="h-8 mr-3"/>
                    {driver.TeamName}
                </td>
                <td className="py-2">{formatQualifyingTime({ time: driver.Q1 })}</td>
                <td className="py-2">{formatQualifyingTime({ time: driver.Q2 })}</td>
                <td className="py-2">{formatQualifyingTime({ time: driver.Q3 })}</td>
            </tr>
        )
    }
}

// Result body component that contains a table of all the results for the given year, circuit, and session
function ResultBody({ selectedYear, selectedCircuit, selectedSession }) {
    const [eventData, setEventData] = useState(null);
    
    // Fetches event data for the particular year and circuit
        // Fetched everytime year, circuit, or session is changed in the filter
    useEffect(() => {
        const fetchEventData = async () => {
            if (selectedYear && selectedCircuit){
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/event/${selectedYear}/${selectedCircuit}`);
                    const event = response.data;
                    setEventData(event);
                }
                catch (error) {
                    console.log(error);
                    return null;
                }    
            }
        }
        fetchEventData();
    }, [selectedYear, selectedCircuit, selectedSession])
    
    // Gets the correct result type based on what is selected in the session filter
    let resultArr = [];
    if (eventData){
        switch (selectedSession) {
            case 'Sprint Shootout': 
                resultArr = eventData.SprintShootoutResult;
                break;
            case 'Sprint':
                resultArr = eventData.SprintResult;
                break;
            case 'Qualifying':
                resultArr = eventData.QualifyingResult;
                break;
            default:
                resultArr = eventData.RaceResult;
                break;
        }
    }

    // show the race results if there are results and the session is either "race" or "sprint" since they share the same format
    if (resultArr.length > 0 && (selectedSession === 'Race' || selectedSession === 'Sprint')) {
        return (
            <div className="h-70 mt-4 border-black border-[1px] rounded-lg flex justify-center">
                <table className="w-[97%] text-xl bg-white rounded-lg">
                    <thead>
                        <tr className="underline text-xl">
                            <th className="pt-3">Position</th>
                            <th className="pt-3">Driver</th>
                            <th className="pt-3">Team</th>
                            <th className="pt-3">Time</th>
                            <th className="pt-3">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultArr.map(driver => <RaceResultRow driver={driver} key={driver.Abbreviation} />)}
                    </tbody>
                </table>
            </div>
        )
    }

    // Show the qualifying results if they exist and the selected session is "Sprint Shootout" or "Qualifying"
    else if (resultArr.length > 0 && (selectedSession === 'Sprint Shootout' || selectedSession === 'Qualifying')) {
        return (
            <div className="h-70 mt-4 border-black border-[1px] rounded-lg flex justify-center">
                <table className="w-[97%] text-xl bg-white rounded-lg">
                    <thead className="underline text-xl">
                        <th className="pt-3">Position</th>
                        <th className="pt-3">Driver</th>
                        <th className="pt-3">Team</th>
                        <th className="pt-3">Q1</th>
                        <th className="pt-3">Q2</th>
                        <th className="pt-3">Q3</th>
                    </thead>
                    <tbody>
                        {resultArr.map(driver => <QualifyingResultRow driver={driver} key={driver.Abbreviation} />)}
                    </tbody> 
                </table>
            </div>
        )
    }

    // Return no results if an invalid event is selected
    else {
        return (
            <div className="text-2xl flex flex-col justify-center items-center mt-5 border-black border-[1px] rounded-lg p-3">
                <p>No results (yet).</p>
                <p>Please select a race that has already happened.</p>
            </div>
        )
    }
};

export { ResultBody };
