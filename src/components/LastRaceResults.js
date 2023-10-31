import { useFetchData } from '../hooks/useFetchData'
import { Loading } from './Loading'

// function used to format totalRaceTime from API call
    // converts time in ms to hh:mm:ss.ms
function formatTime({ data }) {
  const time = data.totalRaceTime;

  if (time && data.position === 1) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    const ms = time % 1000;

    const formattedTime = `${hours}:${mins < 10 ? `0${mins}`: ''}:${secs}.${ms}`
    return formattedTime;
  }

  // Times for drivers not in first are given as interval to first place
  else if (time && data.position !== 1){
    return `+ ${time/1000}`;
  }

  else return <div>Data Unavailable</div>
}

// function used to create a row in Last Race Standing row
function LastRaceStandingRow({ data }) {
  // Return a table row if data is fetched
  if (data) {
    return (
      <tr key={data.number} className={data.fastestLapRank === 1 ? 'text-purple-600' : ''}>
        <td>{data.position}</td>
        <td>{data.givenName} {data.familyName}</td>
        <td>{data.constructorName}</td>
        <td>{data.points}</td>
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
  let { data, isLoading } = useFetchData('/last-race-results')
  
  // reloading if data has not been fetched yet
  if (isLoading) return <Loading />

  // Load the table with last race results when the data is fetched
  return (
    <div className="box flex flex-col">
      <div className="sticky top-0">
        <h1 className="h1 h-1/6 mx-2">Last Race Results</h1>
      </div>
      <div className="h-5/6 overflow-y-auto mt-2 mx-2">
        <table className="w-full">
          <thead>
            <tr>
              <th>Place</th>
              <th>Name</th>
              <th>Team</th>
              <th>Points</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((result, index) => (
                <LastRaceStandingRow key={index} data={result} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { LastRaceResults }