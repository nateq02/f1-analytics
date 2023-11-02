import '../App.css';
import '../index.css';
import { BrowserRouter, Route } from "react-router-dom"
import LogoPic from "../logo.jpg"
import { NavBar } from "../components/NavBar"
import { DriverStandings } from '../components/DriverStandings';
import { ConstructorStandings } from '../components/ConstructorStandings';
import { Countdown } from '../components/Countdown';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { LastRaceResults } from '../components/LastRaceResults';
import { useFetchData } from '../hooks/useFetchData';

function Logo() {
  return (
    <header>
      <img src={LogoPic} className="w-80" alt="logo" />
    </header>
  );
}
// Can delete as the boxes get filled in with other components
function Box() {
  return (
    <div className="border rounded-lg border-red-500 w-[30%] h-[45%]"></div>
  )
}

function Home () {
  // Fetch the data and destructure it
  const { data, isLoading } = useFetchData('/next');

  return (
    <>
      <NavBar />
      <div className="flex flex-wrap justify-center content-center gap-x-5 gap-y-10 h-[90vh]">
        <DriverStandings />
        <Countdown data={data} isLoading={isLoading}/>
        <LastRaceResults />
        <ConstructorStandings />
        <UpcomingEvents data={data} isLoading={isLoading}/>
        <Box />
      </div>
    </>
  )
}

export { Logo, Box, Home };