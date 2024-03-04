import { useState, useEffect } from 'react';
import { formatTime } from './LastRaceResults'
import axios from 'axios';

function RaceResultRow({ driver }) {
    if (driver){
        return (
            <tr key={driver.Abbreviation}>
                <td className="py-1">{driver.ClassifiedPosition}</td>
                <td className="py-1">{driver.FullName}</td>
                <td className="py-1">{driver.TeamName}</td>
                <td className="py-1">{formatTime({ data: driver })}</td>
                <td className="py-1">{driver.Points}</td>
            </tr>
        )
    }

    else {
        return (<div>Data Unavailable</div>)
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
            <div className="h-70 mt-4 border-black border-[1px]">
                <table className="w-full text-lg bg-white">
                    <thead>
                        <tr className="underline">
                            <th>Position</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Time</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultArr.map(driver => <RaceResultRow driver={driver} key={driver.Abbreviation} />)}
                    </tbody>
                </table>
            </div>
        )
    }
};

export { ResultBody };
