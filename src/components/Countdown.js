import { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';


/* ******** TO DO ***********
- Add logic to fetch next event when the countdown < 0
    - Or do I want to also include a "happening now" for when session is occuring?
- Fix refresh issue: at initial refresh data hasn't rendered -> large negative numbers
- Break down component into smaller components
*/

function Countdown() {
    // Declares state components for the countdown
    let [days, setDays] = useState(null);
    let [hours, setHours] = useState(null);
    let [minutes, setMinutes] = useState(null);
    let [seconds, setSeconds] = useState(null);

    // Fetch the data and destructure it
    const { data, isLoading } = useFetchData('/next');

    // Will set data to an empty string if it hasn't loaded quite yet
    const next_event = data ? data[0] : "";

    // Getting next event, formatting the string with proper capitalization
    let next_event_name = String(next_event.OfficialEventName);
    const next_event_name_words = next_event_name.split(" ");
    for (let i = 0; i < next_event_name_words.length; i++) {
        next_event_name_words[i] = next_event_name_words[i][0].toUpperCase() + next_event_name_words[i].substr(1).toLowerCase();
    }
    next_event_name = next_event_name_words.join(" ");

    // Getting next session of Event
        // Create an array of all event: session:time pairs
    const event_date_time_dict = {}
    const event_names = ['Session1', 'Session2', 'Session3', 'Session4', 'Session5']

    for (const event of event_names) {
        const time_var = event + 'DateUtc';
        const time_str = next_event[time_var];
        const time_obj = new Date(time_str);

        // Converts to UTC time based on the local time offset
        const offset = time_obj.getTimezoneOffset();
        const local_time = new Date(time_obj - offset * 60000);

        event_date_time_dict[event] = local_time // values should be a date/time value
    }

    // Gets current date
    const curr_date_time = new Date();

    // Iterates through session list, determines closest session that has not passed
        // Gets session name and time
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
    // Used for the actual countdown
    useEffect(() => {
        // only renders if next_session_time is not null
        if (next_session_time){
            // interval stores a unique id for the interval countdown
            const interval = setInterval(() => {
                // compute difference between next session and not + set state!
                const diff = next_session_time - Date.now();
    
                setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
                setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
            }, 1000);   // Update every second
            return () => clearInterval(interval); // clearInterval stops the countdown when it reaches 0
        }
    }, [Date.now()]); // Date.now() is a dependency: want a refresh after it changes

    // Renders a Loading... prompt on the screen
        // hours == null makes loading render if hours has not been assigned (data is not loaded)
            // Ensures that countdown does not render with null values
    if (isLoading || hours == null) {
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