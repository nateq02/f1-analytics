import './App.css';
import {useFetchData} from './fetch.js'

const url = 'http://127.0.0.1:8000'

function Logo() {
  return (
    <header>
      <img src={require("./logo.jpg")} className="w-80" alt="logo" />
    </header>
  );
}
// Can delete as the boxes get filled in with other components
function Box() {
  return (
    <div className="border rounded-lg border-red-500 w-[30%] h-[45%]"></div>
  )
}

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
  let input = useFetchData(url, '/driver-standings')

  // Checks if request is still loading
    // If still loading, show that on the webpage
  if (input.isLoading) {
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
        <h1 className="h1 underline h-1/6">Driver Standings</h1>
      </div>
      <div className="h-5/6 overflow-y-scroll mt-2">
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
              input.data.map((driver, index) => (
                <DriverStandingRow key={index} driver={driver} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
};

// function used to create a row in driver standings table
// Takes input of driver
function ConstructorStandingRow({ constr }) {
  // If data is not None i.e. data is retrieved
  if (constr){
    // Return a table row with position, name, constructor, points
    return (
    <tr key={constr.constructorId}>
      <td>{constr.position}</td>
      <td>{constr.constructorName}</td>
      <td>{constr.points}</td>
    </tr>
  );
}
  // If no data, return a message
  else {
    return <div>Data Unavailable</div>
  }
};

function ConstructorStandings() {
  // calls useFetchData to get data
  let input = useFetchData(url, '/constructor-standings')

  // Checks if request is still loading
    // If still loading, show that on the webpage
  if (input.isLoading) {
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
        <h1 className="h1 underline h-1/6">Constructor Standings</h1>
      </div>
      <div className="h-5/6 overflow-y-scroll mt-2">
        <table className="w-full">
          <thead>
            <tr>
              <th>Place</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {
              input.data.map((constr, index) => (
                <ConstructorStandingRow key={index} constr={constr} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
};

function Countdown() {
  /*const fetchData = async () => {
    try{
      const response = await axios.get(`${url}/next`);
      const data = response.data;

      let nextDate = new Date(data.Session1Date);
      let currentDate = new Date();
      //console.log(currentDate);
      //console.log(new Date(data.Session1Date));

      // A way of calculating how long the next "session" is
        // Does not take into account time zone differences, need to figure that out
      let monthsTo = nextDate.getMonth() - currentDate.getMonth();
      let daysTo = nextDate.getDate() - currentDate.getDate(); 
      let hoursTo = nextDate.getHours() - currentDate.getHours();
      let minutesTo = nextDate.getMinutes() - currentDate.getMinutes();
      let secondsTo = nextDate.getSeconds() - currentDate.getSeconds();
      let toNext = `${monthsTo} months, ${daysTo} days, ${hoursTo} hours, ${minutesTo} minutes, ${secondsTo} seconds`;
      console.log(toNext);
    }
    catch (error) {
      console.log(error.response);
    }
  }
  fetchData();*/


  //const response = await axios.get('http://localhost:8000/next');
  //const data = response.data;
  return (
      <div className="box">
        <h1 className="h1">Countdown to Race Weekend</h1>
      </div>
  )
}

export { Logo, Box, DriverStandings, ConstructorStandings, Countdown };