import { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';

function Countdown() {
    // Loads the data from the API
    let [days, setDays] = useState(null);
    let [hours, setHours] = useState(null);
    let [minutes, setMinutes] = useState(null);
    let [seconds, setSeconds] = useState(null);

    const { data, isLoading } = useFetchData('/next');

    const next_event = data ? data[0] : "";

    // Getting next event, formatting the string with proper capitalization
    let next_event_name = String(next_event.OfficialEventName);
    const next_event_name_words = next_event_name.split(" ");
    for (let i = 0; i < next_event_name_words.length; i++) {
        next_event_name_words[i] = next_event_name_words[i][0].toUpperCase() + next_event_name_words[i].substr(1).toLowerCase();
    }
    next_event_name = next_event_name_words.join(" ");

    // Getting next session of Event
        // Need to figure out logic to update automatically for practice 2, 3, qual, race
        // Work with UTC time, fix timezones later
    // Create an array of all event: date/time pairs
    const event_date_time_dict = {}
    const event_names = ['Session1', 'Session2', 'Session3', 'Session4', 'Session5']

    for (const event of event_names) {
        const time_var = event + 'DateUtc';
        const time_str = next_event[time_var];
        const time_obj = new Date(time_str);

        event_date_time_dict[event] = time_obj // values should be a date/time value
    }

    // Gets current date
    const curr_date_time = new Date();

    let next_session = null;
    let next_session_time = null;
    let min = Infinity;
    for (const event in event_date_time_dict){
        // find difference between times
        let diff = event_date_time_dict[event] - curr_date_time;

        // if time difference is less than current min, and >0, then it's the upcoming event
        if (diff < min && diff > 0){
            min = diff;
            next_session = next_event[event];
            next_session_time = event_date_time_dict[event];
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = next_session_time - Date.now();

            setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="box flex justify-center content-center">
                Loading...
            </div>
            )
    }

    return (
        <div className="box flex flex-col">
            <h1 className="h1 underline h-1/6">Countdown to Race Weekend</h1>
            <div className="flex flex-col justify-between items-center h-full text-xl">
                <div className="text-center">Next Event: {next_event_name}</div>
                <div className="text-center">Next Session: {next_session}</div>
                <div className="text-center">Countdown: {days} days, {hours} hours, {minutes} minutes, {seconds} seconds</div>    
            </div>
        </div>
    )
}

export { Countdown }