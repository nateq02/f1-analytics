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

function getTeamLogo(teamName) {
    switch (teamName){
        case 'Alpine':
            return alpineLogo;
        case 'Aston Martin':
            return astonLogo;
        case 'Ferrari':
            return ferrariLogo;
        case 'Haas F1 Team':
            return haasLogo;
        case 'McLaren':
            return mclarenLogo;
        case 'Mercedes':
            return mercedesLogo;
        case 'Red Bull Racing':
            return redBullLogo;
        case 'RB':
            return rbLogo;
        case 'Williams':
            return williamsLogo;
        case 'Kick Sauber': 
            return kickLogo;
        case 'AlphaTauri':
            return alphaTauriLogo;
        case 'Alfa Romeo':
        case 'Alfa Romeo Racing':
            return alfaRomeoLogo;
        case 'Racing Point':
            return racingPointLogo;
        case 'Renault':
            return renaultLogo;
        case 'Toro Rosso':
            return toroRossoLogo;
        case 'Sauber':
            return sauberLogo;
        case 'Force India':
            return forceIndiaLogo;
        default:
            return null;
    }
}

function RaceResultRow({ driver }) {
    if (driver){
        return (
            <tr key={driver.Abbreviation} className="border-b-red-600 border-b-[1px] shadow-sm">
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

    else {
        return (<div>Data Unavailable</div>)
    }
}

function formatQualifyingTime({ time }) {
    if (time){
        const min = Math.floor(time / 60);
        const secs = Math.round(time % 60);
        const ms = Math.round((time % 1) * 1000);
        return `${min}:${secs < 10 ? `0${secs}`: `${secs}`}:${ms < 10 ? `00${ms}`: ms < 100 ? `0${ms}`: ms}`
    }
    else return '--'
}

function QualifyingResultRow({ driver }) {
    if (driver) {
        return (
            <tr key={driver.Abbreviation} className="border-b-red-600 border-b-[1px] shadow-sm">
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

const ResultBody = ({ selectedYear, selectedCircuit, selectedSession }) => {
    const [eventData, setEventData] = useState(null);
    useEffect(() => {
        const fetchEventData = async () => {
            if (selectedYear && selectedCircuit){
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/event/${selectedYear}/${selectedCircuit}`);
                    const event = response.data;
                    setEventData(event);
                }
                catch (error) {
                    console.log(error)
                }    
            }
        }
        fetchEventData();
    }, [selectedYear, selectedCircuit, selectedSession])
    
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
            case 'Race':
                resultArr = eventData.RaceResult;
                break;
        }
    }

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
