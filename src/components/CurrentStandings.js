import { Loading } from './Loading'
import { useFetchData } from '../hooks/useFetchData.js'
import { useState } from 'react';

// function used to create a row in driver standings table
  // Takes input of driver
function DriverStandingRow({ driver }) {
// If data is not None i.e. data is retrieved
if (driver){
// Return a table row with position, name, constructor, points
return (
<tr key={driver.driverId} className="border-b-red-600 border-[1px] border-dashed">
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

// function used to create a row in driver standings table
// Takes input of driver
function ConstructorStandingRow({ constr }) {
    // If data is not None i.e. data is retrieved
    if (constr){
      // Return a table row with position, name, constructor, points
      return (
      <tr key={constr.constructorId} className="border-b-red-600 border-[1px] border-dashed">
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


function CurrentStandings() {
    const [selected, setSelected] = useState("driver");

    const toggle = (option) =>{
        setSelected(option);
    }

    // driverButton.addEventListener('click', () => {
    //     setSelected('driver');
    // })

    // constructorButton.addEventListener('click', () => {
    //     setSelected('constructor');
    // })

    // Logic to fetch the data
    const driverData = useFetchData("/driver-standings");
    const constructorData = useFetchData("/constructor-standings");

    const driverStandings = driverData.data;
    const driverIsLoading = driverData.isLoading;

    const constructorStandings = constructorData.data;
    const constructorIsLoading = constructorData.isLoading;

    if ((driverIsLoading) || (constructorIsLoading === true)) return <Loading />

    return (
        <div className="w-1/2 border-black border-2">
            <h1 className="sectionHeader bg-black py-1 text-center">Standings</h1>
            <div className="flex justify-center gap-20 bg-red-600 text-white py-0.5">
                <button className={`w-1/4 hover:shadow-inner
                ${selected === 'driver' ? 'text-black bg-white border-black border-[1px]': ''}`} 
                    onClick={() => toggle('driver')}>Driver</button>
                <button className={`w-1/4 ${selected === 'constructor' ? 'text-black bg-white border-black border-[1px]': ''}`} 
                    onClick={() => toggle('constructor')}>Constructor</button>
            </div>
            <div className="max-h-48 overflow-y-auto bg-white">
                <table id="driverStandings" className={`h-full w-full text-xl ${selected === 'driver' ? '' : 'hidden'}`}>
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
                <table id="constructorStandings" className={`h-full w-full text-xl ${selected === 'constructor' ? '' : 'hidden'}`}>
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

export {CurrentStandings}