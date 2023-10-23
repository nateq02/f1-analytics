import '../App.css';
import { useFetchData } from '../hooks/useFetchData.js'

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
    let input = useFetchData('/constructor-standings')
  
    // Checks if request is still loading
      // If still loading, show that on the webpage
    if (input.isLoading) {
      return (
        <> 
            <div className="box flex justify-center items-center">
                <div class="w-5 h-5 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
            </div>
        </>
      )
    }
  
    // when data finally loads, load the box with the table
    return (
      <div className="box flex flex-col">
        <div className="sticky top-0">
          <h1 className="h1 h-1/6 mx-2">Constructor Standings</h1>
        </div>
        <div className="h-5/6 overflow-y-scroll mt-2 mx-2">
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