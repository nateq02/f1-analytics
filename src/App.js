import './App.css';
import axios from 'axios'

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
/*function App() {
  return (
    <div>
      <h1 className = "text-3xl fond-bold underline bg-slate-600">
        Hello world!
      </h1>
    </div>
  );
}*/

function Logo() {
  return (
    <img src={require("./logo.jpg")} className="w-80" alt="logo" />
  );
}

function Box() {
  return (
    <div className="border rounded-lg border-red-500 w-[30%] h-[45%]"></div>
  )
}

async function fetchData({ url })  {
  // try/catch for error handling
  try{
    // use axios to get driver standings at url
    const response = await axios.get(`${url}/driver-standings`);
    
    // extracts data from the response
    const data = response.data;

    return data;
  }
  // return the error if one arises
  catch (error) {
    return error;
  }
};

function standingRow({ data }, val) {
  if (data){
    return (
    <tr key={data[val].driverId}>
      <td>{data[val].position}</td>
      <td>{data[val].givenName} {data[val].familyName}</td>
      <td>{data[val].constructorNames}</td>
      <td>{data[val].points}</td>
    </tr>
  );
}
else {
  return <div />
}
};

function DriverStandings({ data }) {
  const rows = [];

  for (let i = 0; i < data.length; i++) {
    rows.push(standingRow({data}, i));
  };

  return (
    <div className="box overflow-y-scroll">
      <h1 className="h1 underline">Driver Standings</h1>
      <table className = "w-full h-full">
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Team</th>
          <th>Points</th>
        </tr>
        {rows}
      </table>
    </div>
  )
};

function ConstructorStandings() {
  return (
    <div className="box">
      <h1 className="h1">Constructor Standings</h1>
    </div>
  )
}

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

export { Logo, Box, DriverStandings, ConstructorStandings, Countdown, fetchData };