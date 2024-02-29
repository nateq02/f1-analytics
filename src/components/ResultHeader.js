import { useState, useEffect } from 'react'
import { useFetchData } from '../hooks/useFetchData'
import { Loading } from './Loading'
import axios from 'axios'

function YearFilter({ selectedYear, onChange }) {
    const startYear = 2018;
    const endYear = new Date().getFullYear();

    const years = [];
    for (let year = startYear; year <= endYear; year++){
        years.push(year);
    }

    return(
        <select name="year" id="year" value={selectedYear} onChange ={(e) => onChange(e.target.value)} className="rounded-lg px-4">
            {years.map((year) => 
                <option key={year} value={year}>
                    {year}
                </option>)}
        </select>
    )
}

function CircuitFilter({ selectedYear, selectedCircuit, onChange }) {
    const [circuit_arr, setCircuitArr] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventList = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/events/${selectedYear}`);
                const event_list = response.data;
                const circuit_arr = event_list.map((event) => event.EventName);
                setCircuitArr(circuit_arr);
            }
            catch (e) {
                setError(e);
            }
        }
        fetchEventList();
    }, [selectedYear])
    
    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <select name="circuit" id="circuit" value={selectedCircuit} onChange={(e) => onChange(e.target.value)} className="rounded-lg px-4">
            {circuit_arr.map((circuit) =>
                <option key={circuit} value={circuit}>
                    {circuit}
                </option>)}
        </select>
    )
}

function SessionFilter({ selectedYear, selectedCircuit, selectedSession, onChange }) {
    const [eventData, setEventData] = useState([]);
    const [sessionArr, setSessionArr] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSessionList = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/event/${selectedYear}/${selectedCircuit}`);
                const session_list = response.data;
                setEventData(session_list);

                if (session_list) {
                    const newSessionArr = [];
                    if (session_list.SprintShootoutResult && session_list.SprintShootoutResult.length !== 0){
                        newSessionArr.push('Sprint Shootout');
                    }
                    if (session_list.SprintResult && session_list.SprintResult.length !== 0){
                        newSessionArr.push('Sprint');
                    }
                    if (session_list.QualifyingResult && session_list.QualifyingResult.length !== 0){
                        newSessionArr.push('Qualifying');
                    }
                    if (session_list.RaceResult && session_list.RaceResult.length !== 0){
                        newSessionArr.push('Race')
                    }
                    setSessionArr(newSessionArr);
                    console.log(eventData)
                }
            }
            catch (e) {
                setError(e);
            }
        }
        fetchSessionList();
    }, [selectedYear, selectedCircuit])

    return (
        <select name="session" id="session" value={selectedSession} onChange={(e) => onChange(e.target.value)} className="rounded-lg px-4">
            {sessionArr.map((session) =>
                <option key={session} value={session}>
                    {session}
                </option>)}
        </select>
    )
}

function ResultHeader({ selectedYear, selectedCircuit, selectedSession, 
    onYearChange, onCircuitChange, onSessionChange}) {
    // const [selectedYear, setSelectedYear] = useState('');
    // const [selectedCircuit, setSelectedCircuit] = useState('');
    // const [selectedSession, setSelectedSession] = useState('');

    const lastEvent = useFetchData('/last-event');
    const lastEventData = lastEvent ? lastEvent.data : null;
    
    useEffect(() => {
        if (!lastEvent.isLoading){
            const lastDate = lastEventData.EventDate;
            const lastEventYear = new Date(lastDate).getFullYear();

            const lastCircuit = lastEventData.EventName;
            const lastSession = 'Race';

            onYearChange(lastEventYear);
            onCircuitChange(lastCircuit);
            onSessionChange(lastSession);
        }
    }, [lastEventData])

    const handleYearChange = (year) => {
        onYearChange(year);
    };

    const handleCircuitChange = (circuit) => {
        onCircuitChange(circuit);
    }

    const handleSessionChange = (session) => {
        onSessionChange(session);
    }

    if (selectedYear === '' || selectedCircuit === '' || selectedSession === '') return <Loading />

    return (
        <div className="w-full">
            <div className="bg-black border-black border-2 rounded-t-lg shadow-lg p-2 mt-10">
                <h1 className="sectionHeader">{selectedYear} Race Results</h1>
            </div>
            <div className="flex justify-evenly bg-gradient-to-b from-red-600 to-red-400 rounded-b-lg text-lg">
                <div className="flex items-center gap-3 p-2">
                    <p className="text-white">Year: </p>
                    <YearFilter selectedYear={selectedYear} onChange={handleYearChange} />
                </div>
                <div className="flex items-center gap-3 p-2">
                    <p className="text-white">Circuit: </p>
                    <CircuitFilter selectedYear={selectedYear} selectedCircuit={selectedCircuit} onChange={handleCircuitChange} />
                </div>
                <div className="flex items-center gap-3 p-2">
                    <p className="text-white">Session: </p>
                    <SessionFilter selectedYear={selectedYear} selectedCircuit={selectedCircuit} selectedSession={selectedSession} onChange={handleSessionChange} />
                </div>
            </div>
        </div>
    )
}

export { ResultHeader }