import { Loading } from './Loading'
import React from 'react';

function UpcomingEventsRow({ event }) {
    if (event) {
        const next_event_name = String(event.OfficialEventName);
        const next_event_name_words = next_event_name.split(" ");
        for (let i = 0; i < next_event_name_words.length; i++) {
            next_event_name_words[i] = next_event_name_words[i].charAt(0) + next_event_name_words[i].substr(1).toLowerCase();
        }
        const formattedEventName = next_event_name_words.join(" ");

        const eventDate = new Date(event.EventDate);
        const formattedDate = eventDate.toLocaleDateString("en-US");

        return (
            <tr key={event.RoundNumber}>
                <td>{formattedEventName}</td>
                <td>{formattedDate}</td>
            </tr>
        )
    }

    return <div>Data Unavailable</div>
}
function UpcomingEvents({ data, isLoading }) {

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="box flex flex-col">
            <div className="sticky top-0">
                <h1 className="h1 h-1/6 mx-2">Upcoming Events</h1>
            </div>
            <div className="h-5/6 overflow-y-auto mt-2 mx-2">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Start Date</th>
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
    )
}

export { UpcomingEvents }