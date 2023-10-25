import './App.css';
import './index.css';
import { useContext } from 'react'
import { DriverStandings } from './components/DriverStandings';
import { ConstructorStandings } from './components/ConstructorStandings';
import { Countdown } from './components/Countdown';
import { UpcomingEvents } from './components/UpcomingEvents';
import { useFetchData } from './hooks/useFetchData';

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

function App () {
  // Fetch the data and destructure it
  const { data, isLoading } = useFetchData('/next');

  return (
    <>
      <Logo />
      <div className="flex flex-wrap justify-center content-center gap-x-5 gap-y-10 h-[90vh]">
        <DriverStandings />
        <Countdown data={data} isLoading={isLoading}/>
        <Box />
        <ConstructorStandings />
        <UpcomingEvents data={data} isLoading={isLoading}/>
        <Box />
      </div>
    </>
  )
}

export { Logo, Box, App };