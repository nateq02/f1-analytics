import '../App.css';
import '../index.css';
import { BrowserRouter, Route } from "react-router-dom"
import { NavBar } from "../components/NavBar"
import { CurrentStandings } from '../components/CurrentStandings';
import { Countdown } from '../components/Countdown';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { LastRaceResults } from '../components/LastRaceResults';
import { NextCircuit } from '../components/NextCircuit'
import { useFetchData } from '../hooks/useFetchData';

function Home () {
  // Fetch the data and destructure it
  const { data, isLoading, error } = useFetchData("/next");
  
  return (
    <div className="font-default m-0">
      <NavBar />
      <div className="flex flex-col flex-wrap justify-center content-center gap-x-5 gap-y-8 h-[90vh] bg-gray-300">
        <Countdown data={data} isLoading={isLoading}/>
        <div className="flex justify-evenly gap-x-8 max-h-72">
          <CurrentStandings />
          <LastRaceResults />
        </div>
        <UpcomingEvents data={data} isLoading={isLoading}/>
      </div>
    </div>
  ) 
}

export { Home };