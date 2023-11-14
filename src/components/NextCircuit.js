import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useFetchData } from '../hooks/useFetchData.js';
import { cos, sin } from 'mathjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Loading } from './Loading';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function matrixMultiply(A, B) {
    const C = new Array(A.length);

    for (let i = 0; i < A.length; i++) {
        C[i] = new Array(B[0].length);
        for (let j = 0; j < B[0].length; j++) {
            C[i][j] = 0;
            for (let k = 0; k < A[0].length; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

function rotate(xy, angle) {
    const rot_map = [[cos(angle), sin(angle)],
                [-sin(angle), cos(angle)]]
      
    return matrixMultiply(xy, rot_map);
}

// function CircuitMap() {
//     //let [chartData, setChartData] = useState(null);
    
//     //const { positionData, lapIsLoading } = useFetchData('/fastest-lap-info');
//     let positionFetch = useFetchData('/fastest-lap-info');
//     let positionData = positionFetch.data;
//     let positionIsLoading = positionFetch.isLoading;

//     let circuitFetch = useFetchData('/circuit-info');
//     let circuitData = circuitFetch.data;
//     //const xyPositionData = positionData.map(obj => [obj.X, obj.Y]);

//     if (positionIsLoading) {
//         //return <Loading />
//         console.log("loading")
//         console.log(positionFetch)
//     }

//     else if (positionData !== null) {
//         const chartData= {
//             labels: positionData.map(obj => obj.X),
//             datasets: [{
//                 label: "Test",
//                 data: positionData.map(obj => obj.Y)
//             }]
//         }

//         return <Line data={chartData} />
//     }
// }

function NextCircuit() {
    const { data, isLoading } = useFetchData('/fastest-lap-info');
    const circuit = useFetchData('/circuit-info');

    const circuitData = circuit.data;
    const circuitIsLoading = circuit.isLoading;

    let track, trackAngle, rotatedTrack, x, y, chartData; 

    // if (data) {
    //     track = data.map(obj => [obj.X, obj.Y])
    //     console.log(track)
    // }

    // if (circuitData && track){
    //     trackAngle = circuitData.rotation / 180 * Math.PI;

    //     rotatedTrack = rotate(track, trackAngle);
    //     //console.log(trackAngle);

    // }

    if (data) {
        x = data.map(obj => obj.X);
        y = data.map(obj => obj.Y);

        chartData = {
            labels: x,
            datasets: [{
                data: y
            }]
        }
    }

    if (isLoading || !chartData) {
        return <Loading />
    }

    return (
        <div className="box">
            <h1 className="h1">Next Circuit: </h1>
            <Line data={chartData} />
        </div>
    )
}



// function NextCircuit() {
//     return (
//         <div className="box">
//             <Line
//                 datasetIdKey='id'
//                 data={{
//                     labels: ['Jun', 'Jul', 'Aug'],
//                     datasets: [
//                     {
//                         id: 1,
//                         label: '',
//                         data: [5, 6, 7],
//                     },
//                     {
//                         id: 2,
//                         label: '',
//                         data: [3, 2, 1],
//                     },
//                     ],
//                 }}
//             />
//         </div>
//     )
// }
export { NextCircuit }