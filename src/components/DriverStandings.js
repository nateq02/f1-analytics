import '../App.css';
import { useFetchData } from '../hooks/useFetchData.js'

// function used to create a row in driver standings table
  // Takes input of driver
function DriverStandingRow({ driver }) {
    // If data is not None i.e. data is retrieved
    if (driver){
      // Return a table row with position, name, constructor, points
      return (
      <tr key={driver.driverId}>
        <td>{driver.position}</td>
        <td>{driver.givenName} {driver.familyName}</td>
        <td>{driver.constructorNames}</td>
        <td>{driver.points}</td>
      </tr>
    );
  }
    // If no data, return a message
    else {
      return <div>Data Unavailable</div>
    }
  };
  
  // Actual DriverStandings component
  function DriverStandings() {
    // calls useFetchData to get data
    let { data, isLoading } = useFetchData('/driver-standings')
  
    // Checks if request is still loading
      // If still loading, show that on the webpage
    if (isLoading) {
      return (
        <div className="box flex justify-center content-center">
          <div>Loading...</div>
        </div>
      )
    }
  
    // when data finally loads, load the box with the table
    return (
      <div className="box flex flex-col">
        <div className="sticky top-0">
          <h1 className="h1 h-1/6 mx-2">Driver Standings</h1>
        </div>
        <div className="h-5/6 overflow-y-scroll mt-2 mx-2">
          <table className="w-full">
            <thead>
              <tr>
                <th>Place</th>
                <th>Name</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((driver, index) => (
                  <DriverStandingRow key={index} driver={driver} />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  };

  export { DriverStandings };