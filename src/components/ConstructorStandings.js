import '../App.css';
import { Link } from "react-router-dom"
import { useFetchData } from '../hooks/useFetchData.js'
import { Loading } from './Loading'

// function used to create a row in driver standings table
// Takes input of driver
function ConstructorStandingRow({ constr }) {
    // If data is not None i.e. data is retrieved
    if (constr){
      let textColor = null;
      switch(constr.position) {
        case 1:
          textColor = 'text-yellow-500';
          break;
        case 2: 
          textColor = 'text-slate-400';
          break;
        case 3: 
          textColor = 'text-amber-600';
          break;
        default:
          textColor = '';
      }
      // Return a table row with position, name, constructor, points
      return (
      <tr key={constr.constructorId} className={textColor}>
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
    let input = useFetchData('/constructor-standings')
  
    // Checks if request is still loading
      // If still loading, show that on the webpage
    if (input.isLoading) {
      return (
        <Loading />
      )
    }
  
    // when data finally loads, load the box with the table
    return (
      <div className="box flex flex-col">
        <div className="sticky top-0">
          <Link to="/standings">
            <h1 className="h1 h-1/6 mx-2 hover:underline">Constructor Standings</h1>
          </Link>
        </div>
        <div className="h-5/6 overflow-y-auto mt-2 mx-2">
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
  
  export { ConstructorStandings };