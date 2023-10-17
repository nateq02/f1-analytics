import './App.css';
import './index.css';
import { DriverStandings } from './components/DriverStandings'
import { ConstructorStandings } from './components/ConstructorStandings'
import {useFetchData} from './hooks/useFetchData.js'

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

function App () {
  return (
    <>
      <Logo />
      <div className="flex flex-wrap justify-center content-center gap-x-5 gap-y-10 h-[90vh]">
        <DriverStandings />
        <Countdown />
        <Box />
        <ConstructorStandings />
        <Box />
        <Box />
      </div>
    </>
  )
}

export { Logo, Box, Countdown, App };