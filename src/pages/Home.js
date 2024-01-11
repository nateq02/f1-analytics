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

// Can delete as the boxes get filled in with other components
function Box() {
  return (
    <div className="border rounded-lg border-red-500 w-[30%] h-[45%]"></div>
  )
}

function Home () {
  // Fetch the data and destructure it
  // const { data, isLoading } = useFetchData('/next');
  const data = [{
    RoundNumber: 1,
    Country: 'Bahrain',
    Location: 'Sakhir',
    OfficialEventName: 'FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2024',
    EventDate: '2024-2-29',
    EventName: 'Bahrain Grand Prix',
    EventFormat: 'conventional',
    Session1: 'Practice 1',
    Session1Date: '2024-02-29 14:30:00+03:00',
    Session1DateUtc: '2024-02-29 11:30:00',
    Session2: 'Practice 2',
    Session2Date: '2024-02-29 18:0:00+03:00',
    Session2DateUtc: '2024-02-29 15:00:00',
    Session3: 'Practice 3',
    Session3Date: '2024-03-01 15:00:00+03:00',
    Session3DateUtc: '2024-02-29 12:00:00',
    Session4: 'Qualifying',
    Session4Date: '2024-03-01 18:00:00+03:00',
    Session4DateUtc: '2024-02-29 15:00:00',
    Session5: 'Race',
    Session5Date: '2024-03-02 18:00:00+03:00',
    Session5DateUtc: '2024-02-29 15:00:00',
    F1ApiSupport: 'True'
  }];

  const isLoading=false;

  return (
    <div className="font-default">
      <NavBar />
      <div className="flex flex-col flex-wrap justify-center content-center gap-x-5 gap-y-8 h-[90vh] bg-gray-300">
        <Countdown data={data[0]} isLoading={isLoading}/> {/*Added the [0] for the dummy data*/}
        <div className="flex justify-between gap-x-8 max-h-72">
          <CurrentStandings />
          <LastRaceResults /> 
        </div>
        <UpcomingEvents data={data} isLoading={isLoading}/>
      </div>
    </div>
  )
}

export { Home };