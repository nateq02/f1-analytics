import { useState, useEffect, useMemo } from 'react';
import { Loading } from './Loading';
import verHamPic from '../imgs/ham-ver-pic.png';

/* ******** TO DO ***********
- Need to add a useEffect that will get next event when one has passed
- Break down component into smaller components
*/
function getNextSession(next_event, session_dict) {
    // Gets current date
    const curr_date_time = new Date();

    // Iterates through session list, determines closest session that has not passed
    // Used for updating upcoming events if they change
    let min = Infinity;
    let nextName = null;
    let nextTime = null;

    for (const event in session_dict) {
        // find difference between times
        let diff = session_dict[event] - curr_date_time;
        
        // if a session has passed, remove it from the dictionary
        if (diff < 0) {
            delete session_dict[event];
        }
        // if time difference is less than current min, and >0, then it's the upcoming event
        if (diff < min && diff > 0){
            min = diff;
            nextName = next_event[event];
            nextTime = session_dict[event];
        }
    }
    return {nextName, nextTime};
}

function Countdown({ data, isLoading }) {
    
    // Declares state components for the countdown
    let [days, setDays] = useState(null);
    let [hours, setHours] = useState(null);
    let [minutes, setMinutes] = useState(null);
    let [seconds, setSeconds] = useState(null);

    // Will set data to an empty string if it hasn't loaded quite yet
    // const next_event = data ? data[0] : "";
    const next_event = data;
    // Getting next event, formatting the string with proper capitalization
    let next_event_name = String(next_event.OfficialEventName);
    const next_event_name_words = next_event_name.split(" ");
    for (let i = 0; i < next_event_name_words.length; i++) {
        next_event_name_words[i] = next_event_name_words[i].charAt(0) + next_event_name_words[i].substr(1).toLowerCase();
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
    
    // Caches the next session, only updates when event_date_time_dict is updated
        // Aka when a past event has been deleted
    const {nextName, nextTime} = useMemo(() => getNextSession(next_event, event_date_time_dict)
        , [next_event, event_date_time_dict])

    // Used for the actual countdown
    useEffect(() => {
        // only renders if next_session_time is not null
        if (nextTime) {
            // interval stores a unique id for the interval countdown
            const interval = setInterval(() => {
                // compute difference between next session and not + set state!
                const diff = nextTime - Date.now();
    
                setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
                setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
            }, 1000);   // Update every second

            return () => clearInterval(interval); // clearInterval stops the countdown when it reaches 0
        }
    }, [nextTime, days, hours, minutes, seconds]); // Date.now() is a dependency: want a refresh after it changes

    // Renders a Loading... prompt on the screen
        // hours == null makes loading render if hours has not been assigned (data is not loaded)
            // Ensures that countdown does not render with null values
    if (isLoading || hours == null) return <Loading />

    // if (isLoading){
    //     console.log('is loading');
    //     if (hours==null){
    //         console.log('hours is null')
    //     }
    //     return <Loading />
    // }

    return (
        <>
        {/*<div className="box flex flex-col">
            <h1 className="h1 h-1/6 mx-2">Countdown to Race Weekend</h1>
            <div className="flex flex-col justify-between items-center h-full text-xl mx-2">
                <div className="text-center mt-3">
                    <div className="text-lg underline">Next Event</div>
                    <div className="italic">{next_event_name}</div>
                </div>
                <div className="text-center">
                    <div className="text-lg underline">Next Session</div>
                    <div className="italic">{nextName}</div>
                </div>
                <table className="w-full table-fixed mb-3">
                    <thead className="text-lg underline">
                        <tr>
                            <td>Days</td>
                            <td>Hours</td>
                            <td>Minutes</td>
                            <td>Seconds</td>
                        </tr>
                    </thead>
                    <tbody className="text-3xl">
                        <tr>
                            <th>{days}</th>
                            <th>{hours}</th>
                            <th>{minutes}</th>
                            <th>{seconds}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    */}
    <div className='h-52 w-10/12'>
        <div className='h-full w-80 border flex'> {/* Need to figure out how to get a background image*/}
            <h1 className='text-4xl font-bold text-white text-center mt-2'>Countdown to Race Weekend</h1>
        </div>
        <div>
            
        </div>
    </div>
    </>
    )
}

export { Countdown }