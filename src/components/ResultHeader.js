import { useState, useEffect, useMemo } from 'react'
import { useFetchData } from '../hooks/useFetchData'
import { Loading } from './Loading'
import axios from 'axios'

// Creates a filter for the different years for 2018-now
function YearFilter({ selectedYear, onChange }) {
    const startYear = 2018;
    const endYear = new Date().getFullYear();

    // memoize a list array that only updates when startYear or endYear change
    const years = useMemo(() => {
        const tempYears = [];
        for (let year = startYear; year <= endYear; year++){
            tempYears.push(year);
        }
        return tempYears;
    }, [startYear, endYear]);

    return(
        // sets the values to selectedYear and handles changes to the year value when a different year is selected
        <select name="resultYear" id="resultYear" value={selectedYear} onChange ={(e) => onChange(e.target.value)} className="rounded-lg px-4">
            {years.map((year) => 
                <option key={year} value={year}>
                    {year}
                </option>)}
        </select>
    )
}

// Create a circuit filter for all of the circuits in the selected year
function CircuitFilter({ selectedYear, selectedCircuit, onChange }) {
    const [circuit_arr, setCircuitArr] = useState([]);
    const [error, setError] = useState(null);

    // Needs to fetch the data for all events in the current year
    useEffect(() => {
        const fetchEventList = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/events/${selectedYear}`);
                const event_list = response.data;
                // Takes all the eventNames from events in the selected year and sets them to the circuit array
                const circuit_arr = event_list.map((event) => event.EventName);
                setCircuitArr(circuit_arr);
            }
            catch (e) {
                setError(e);
            }
        }
        fetchEventList();
    }, [selectedYear])
    
    // If an error occurs, display the error
    if (error) {
        return <p>Error: {error.message}</p>
    }

    // Show the filter with value selectedCircuit and handles changes to different circuits
    return (
        <select name="resultCircuit" id="resultCircuit" value={selectedCircuit} onChange={(e) => onChange(e.target.value)} className="rounded-lg px-4">
            {circuit_arr.map((circuit) =>
                <option key={circuit} value={circuit}>
                    {circuit}
                </option>)}
        </select>
    )
}

// Creates a filter for users to select a session for the specific race (ex: race, sprint, qualifying...)
function SessionFilter({ selectedYear, selectedCircuit, selectedSession, onChange }) {
    // Declare a state variable to store hte sessions
    const [sessionArr, setSessionArr] = useState([]);

    // Fetch the session data for the event
    useEffect(() => {
        const fetchSessionList = async () => {
            try {
                // Fetch event data based on the selected year and circuit
                const response = await axios.get(`http://127.0.0.1:8000/event/${selectedYear}/${selectedCircuit}`);
                const session_list = response.data;

                // Populate the sessionArr by checking which arrays exist within the event
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
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchSessionList();
    }, [selectedYear, selectedCircuit])

    return (
        <select name="resultSession" id="resultSession" value={selectedSession} onChange={(e) => onChange(e.target.value)} className="rounded-lg px-4">
            {sessionArr.map((session) =>
                <option key={session} value={session}>
                    {session}
                </option>)}
        </select>
    )
}

// The component for the header in the result page, including headings and filters
function ResultHeader({ selectedYear, selectedCircuit, selectedSession, loading,
    onYearChange, onCircuitChange, onSessionChange, setLoading}) {

    // Fetch last event's data and set it as the default
    const lastEvent = useFetchData('/last-event');
    const lastEventData = lastEvent ? lastEvent.data : null;
    
    // Used to ensure that the data is updated when the last event data is loaded
    useEffect(() => {
        if (!lastEvent.isLoading){
            const lastDate = lastEventData.EventDate;
            const lastEventYear = new Date(lastDate).getFullYear();

            const lastCircuit = lastEventData.EventName;
            const lastSession = 'Race';

            onYearChange(lastEventYear);
            onCircuitChange(lastCircuit);
            onSessionChange(lastSession);
            setLoading(false);
        }
    }, [lastEventData])

    // functions that are passed down from parent to handle changes in the filters
    const handleYearChange = (year) => {
        onYearChange(year);
    };

    const handleCircuitChange = (circuit) => {
        onCircuitChange(circuit);
    }

    const handleSessionChange = (session) => {
        onSessionChange(session);
    }

    // If data is being loaded, return a loading spinner
    if (loading) return <Loading />

    // Else, return component
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