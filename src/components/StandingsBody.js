import { useState, useEffect } from 'react';
import { formatTime } from './LastRaceResults';
import { useFetchData } from '../hooks/useFetchData';
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

const teamLogos = {
    'Alpine F1 Team': alpineLogo,
    'Aston Martin': astonLogo,
    'Ferrari': ferrariLogo,
    'Haas F1 Team': haasLogo,
    'McLaren': mclarenLogo,
    'Mercedes': mercedesLogo,
    'Red Bull': redBullLogo,
    'RB F1 Team': rbLogo,
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

function getTeamLogo(teamName, year) {
    if (year === 2024) {
        if (teamName === 'Sauber'){
            return teamLogos['Kick Sauber']
        }
    }
    return teamLogos[teamName] || null;
}

function DriverStandingRow({ record }) {
    if (record) {
        return (
            <tr key={record.driverId} className="border-b-red-600 border-b-[1px] shadow-sm last:border-b-0">
                <td className="py-2">{record.position}</td>
                <td className="py-2">{record.givenName + " " + record.familyName}</td>
                {/* <td className="py-2 flex justify-center items-center">
                    <img src={getTeamLogo(record.constructorNames[0], record.year)} alt={record.constructorNames[-1] + ' Logo'} className="h-8 mr-3"/>
                    {record.constructorNames[0]}
                </td> */}
                <td className="py-2 flex justify-center items-center">
                {record.constructorNames && record.constructorNames[0] && (
                    <>
                        <img src={getTeamLogo(record.constructorNames[0], record.year)} alt={record.constructorNames[0] + ' Logo'} className="h-8 mr-3"/>
                        {record.constructorNames[0]}
                    </>
                )}
</td>
                <td className="py-2">{record.points}</td>
                <td className="py-2">{record.wins}</td>
            </tr>
        )
    }
}

function ConstructorStandingRow({ record }) {
    if (record) {
        return (
            <tr key={record.constructorId} className="border-b-red-600 border-b-[1px] shadow-sm last:border-b-0">
                <td className="py-2">{record.position}</td>
                <td className="py-2 flex justify-center items-center">
                    <img src={getTeamLogo(record.constructorName, record.year)} alt={record.constructorName + ' Logo'} className="h-8 mr-3"/>
                    {record.constructorName}
                </td>
                <td className="py-2">{record.points}</td>
                <td className="py-2">{record.wins}</td>
            </tr>
        )
    }
}

function StandingsBody({ selectedYear, selectedStandings }) {
    const [standingData, setStandingData] = useState(null);

    useEffect(() => {
        const fetchEventData = async () => {
            try{
                if (selectedStandings === 'Driver') {
                    const response = await axios.get(`http://127.0.0.1:8000/driver-standings/${selectedYear}`);
                    const standings = response.data;
                    setStandingData(standings);
                }
    
                else {
                    const response = await axios.get(`http://127.0.0.1:8000/constructor-standings/${selectedYear}`);
                    const standings = response.data;
                    setStandingData(standings);
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        }
        fetchEventData();
    }, [selectedYear, selectedStandings])

    console.log(standingData)
    if (standingData && selectedStandings === 'Driver') {
        return (
            <div className="h-70 mt-4 border-black border-[1px] rounded-lg flex justify-center">
                <table className="w-[97%] text-xl bg-white rounded-lg">
                    <thead>
                        <tr className="underline text-xl">
                            <th className="pt-3">Position</th>
                            <th className="pt-3">Driver</th>
                            <th className="pt-3">Team</th>
                            <th className="pt-3">Points</th>
                            <th className="pt-3">Wins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standingData.map(record => <DriverStandingRow record={record} key={record.driverId} />)}
                    </tbody>
                </table>
            </div>
        )
    }

    else if (standingData && selectedStandings === 'Constructor') {
        return (
            <div className="h-70 mt-4 border-black border-[1px] rounded-lg flex justify-center">
                <table className="w-[97%] text-xl bg-white rounded-lg">
                    <thead>
                        <tr className="underline text-xl">
                            <th className="pt-3">Position</th>
                            <th className="pt-3">Team</th>
                            <th className="pt-3">Points</th>
                            <th className="pt-3">Wins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standingData.map(record => <ConstructorStandingRow record={record} key={record.constructorId} />)}
                    </tbody>
                </table>
            </div>
        )
    }

    else {
        <div className="text-2xl flex flex-col justify-center items-center mt-5 border-black border-[1px] rounded-lg p-3">
            <p>Error in fetching the data</p>
        </div>
    }
}

export { StandingsBody }