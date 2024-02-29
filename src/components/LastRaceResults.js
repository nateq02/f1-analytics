import { format } from 'mathjs';
import { useFetchData } from '../hooks/useFetchData'
import { Loading } from './Loading'

function formatText( {event} ) {
  if (event) {
    // get upcoming event name from the event prop
    const next_event_name = String(event.OfficialEventName);
    const next_event_name_words = next_event_name.split(" ");

    // convert upcoming event name to proper format
    for (let i = 0; i < next_event_name_words.length; i++) {
        next_event_name_words[i] = next_event_name_words[i].charAt(0) + next_event_name_words[i].substr(1).toLowerCase();
    }
    const formattedEventName = next_event_name_words.join(" ");
    
    return formattedEventName;
  }
  else return <Loading />
}
// function used to format totalRaceTime from API call
    // converts time in ms to hh:mm:ss.ms
function formatTime({ data }) {
  const time = data.Time;

  if (time && data.ClassifiedPosition === '1') {
    const hours = Math.floor(time / (60 * 60));
    const mins = Math.floor((time % (60 * 60)) / (60));
    const secs = Math.floor((time % (60)));
    const ms = Math.floor((time * 1000) % 1000);

    const formattedTime = `${hours}:${mins < 10 ? `0${mins}`: `${mins}`}:${secs < 10 ? `0${secs}`: `${secs}`}.${ms}`
    return formattedTime;
  }

  // Times for drivers not in first are given as interval to first place
  else if (time && data.position !== '1'){
    return `+ ${time}`;
  }

  else if (time === null) return <div>{data.Status}</div>
  else return <div>Data Unavailable</div>
}

// function used to create a row in Last Race Standing row
function LastRaceStandingRow({ data }) {
  // Return a table row if data is fetched
  if (data) {
    // fastest lap code for reference: className={data.fastestLapRank === 1 ? 'text-purple-600' : ''}
    return (
      <tr key={data.number} className="border-b-red-600 border-[1px] border-dashed">
        <td>{data.ClassifiedPosition}</td>
        <td>{data.Abbreviation}</td>
        <td>{data.TeamName}</td>
        <td>{data.Points}</td>
        <td>{formatTime({ data })}</td>
      </tr>
    )
  }
  
  // if no data, return a message
  else {
    return <div>Data Unavailable</div>
  }
}

// component for last race results
function LastRaceResults() {
  // useFetchData used to get data
  const eventData = useFetchData("/last-event");

  const event = eventData.data;
  const eventIsLoading = eventData.isLoading;
  const eventError = eventData.error;

  if (eventIsLoading ) return <Loading />
  // Load the table with last race results when the data is fetched
  return (
    <div className="flex flex-col w-1/2 border-black border-2 p-0 rounded-lg shadow-lg">
      <h1 className="sectionHeader bg-black py-1 text-center rounded-t">Last Race Results</h1>
      <div className="bg-red-600 text-white py-[.1875rem] text-center">
        Last Race: {formatText({event}).trim()}
      </div>
      <div className="overflow-y-auto bg-white p-0 m-0 rounded-b-lg">
        <table className="w-full h-full text-xl">
              <thead>
              <tr className="">
                  <th>Place</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Time</th>
              </tr>
              </thead>
              <tbody>
              {
                event.RaceResult.map((raceResult, index) => (
                  <LastRaceStandingRow key={index} data={raceResult} />
                ))
              }
              </tbody>
          </table>
      </div>
    </div>
  )
  // console.log(event)
}

export { LastRaceResults }