import { Loading } from './Loading'
import { useFetchData } from '../hooks/useFetchData.js'
import { useState } from 'react';

// function used to create a row in driver standings table
  // Takes input of driver
function DriverStandingRow({ driver }) {
// If data is not None i.e. data is retrieved
if (driver){
// Return a table row with position, na className="py-1me, constructor, points
return (
<tr key={driver.driverId} className="border-b-red-600 border-b-[1px] border-dashed">
    <td className="py-1">{driver.position}</td>
    <td className="py-1">{driver.givenName} {driver.familyName}</td>
    <td className="py-1">{driver.constructorNames}</td>
    <td className="py-1">{driver.points}</td>
</tr>
);
}
// If no data, return a message
else {
    return <div>Data Unavailable</div>
}
};

// function used to create a row in driver standings table
// Takes input of driver
function ConstructorStandingRow({ constr }) {
    // If data is not None i.e. data is retrieved
    if (constr){
      // Return a table row with position, name, constructor, points
      return (
      <tr key={constr.constructorId} className="border-b-red-600 border-b-[1px] border-dashed">
        <td className="py-1">{constr.position}</td>
        <td className="py-1">{constr.constructorName}</td>
        <td className="py-1">{constr.points}</td>
      </tr>
    );
  }
    // If no data, return a message
    else {
      return <div>Data Unavailable</div>
    }
  };


function CurrentStandings() {
    const [selected, setSelected] = useState("driver");
    const curr_year = new Date().getFullYear();
    const toggle = (option) =>{
        setSelected(option);
    }

    const driverData = useFetchData("/driver-standings/current");
    const constructorData = useFetchData("/constructor-standings/current");

    const driverStandings = driverData.data;
    const driverIsLoading = driverData.isLoading;

    const constructorStandings = constructorData.data;
    const constructorIsLoading = constructorData.isLoading;

    if (driverIsLoading || constructorIsLoading) return <Loading />

    return (
        <div className="flex flex-col w-1/2 border-black border-2 rounded-lg shadow-lg">
            <h1 className="sectionHeader bg-black py-1 text-center rounded-t">Standings</h1>
            <div className="flex justify-center gap-20 bg-red-600 text-white py-0.5">
                <button className={`w-1/4 rounded-lg
                    ${selected === 'driver' ? 'text-black bg-white border-black border-[1px]': 'hover:bg-white hover:text-black hover:border-black hover-border-[1px]'}`} 
                    onClick={() => toggle('driver')}>
                        Driver
                </button>
                <button className={`w-1/4 rounded-lg 
                    ${selected === 'constructor' ? 'text-black bg-white border-black border-[1px]': 'hover:bg-white hover:text-black hover:border-black hover-border-[1px]'}`} 
                    onClick={() => toggle('constructor')}>
                        Constructor
                </button>
            </div>
            <div className="overflow-y-auto bg-white rounded-b-lg flex justify-center">
                <table id="driverStandings" className={`h-full w-[95%] text-xl ${selected === 'driver' ? '' : 'hidden'}`}>
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
                        driverStandings.map((driver, index) => (
                        <DriverStandingRow key={index} driver={driver} />
                        ))
                    }
                    </tbody>
                </table>
                <table id="constructorStandings" className={`h-full w-[95%] text-xl ${selected === 'constructor' ? '' : 'hidden'}`}>
                    <thead>
                    <tr>
                        <th>Place</th>
                        <th>Team</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        constructorStandings.map((constr, index) => (
                            <ConstructorStandingRow key={index} constr={constr} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { CurrentStandings }