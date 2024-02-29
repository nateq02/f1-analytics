import React from 'react';
import { useFetchData } from './useFetchData';

// const ResultBody = ({ selectedYear, selectedCircuit, selectedSession }) => {
//     const { data, isLoading, error } = useFetchData(`/api/results/${selectedYear}/${selectedCircuit}/${selectedSession}`);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <div>
//             {data.map((result, index) => (
//                 <div key={index}>
//                     <h2>{result.Driver}</h2>
//                     <p>{result.Position}</p>
//                     <p>{result.Team}</p>
//                     {/* Add more fields as required */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export { ResultBody };
