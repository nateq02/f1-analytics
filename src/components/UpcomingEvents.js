import { Loading } from './Loading'
import React from 'react';
import raceStart from '../imgs/race-start.png'

// Makes a table row for each upcoming event
function UpcomingEventsRow({ event }) {
    // if an event is loaded (not null) ...
    if (event) {
        // get upcoming event name from the event prop
        const next_event_name = String(event.OfficialEventName);
        const next_event_name_words = next_event_name.split(" ");

        // convert upcoming event name to proper format
        for (let i = 0; i < next_event_name_words.length; i++) {
            next_event_name_words[i] = next_event_name_words[i].charAt(0) + next_event_name_words[i].substr(1).toLowerCase();
        }
        const formattedEventName = next_event_name_words.join(" ");

        // format event date
        const eventDate = new Date(event.EventDate);
        const formattedDate = eventDate.toLocaleDateString("en-US");

        return (
            <tr key={event.RoundNumber}>
                <td className="subtext text-left pl-7">{formattedEventName}</td>
                <td className="subtext text-left pl-7">{formattedDate}</td>
            </tr>
        )
    }

    return <div>Data Unavailable</div>
}
function UpcomingEvents({ data, isLoading }) {
    // if data has not been loaded yet, indicate it
    if (isLoading) return <Loading />

    return (
        <>
        <div className="h-1/5 w-10/12 flex">
            <div className="h-full w-1/4 flex bg-black border-black border-2">
                <img src={raceStart} className="w-full opacity-80"></img>
                <div className="absolute w-1/6 mx-8">
                    <h1 className="sectionHeader mt-2 text-center text-wrap">Upcoming Schedule</h1>
                </div>
            </div>
            <div className="border-black border-2 border-l-0 w-3/4 bg-white flex justify-between overflow-y-auto">
                <table className="w-full table-auto mt-2">
                    <thead>
                        <tr>
                            <th className="subheading mt-3 text-left pl-7">Event</th>
                            <th className="subheading text-left pl-7">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((event, index) => (
                                <UpcomingEventsRow key={index} event={event} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export { UpcomingEvents }