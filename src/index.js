import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Logo, Box, DriverStandings, ConstructorStandings, Countdown, fetchData} from './App';
import reportWebVitals from './reportWebVitals';

const url = 'http://127.0.0.1:8000'

// fetches the data for driver standings
const data = await fetchData({url})
    .then(data => {
      // Converting the string data to JSON
      data = JSON.parse(data);
      return data;
    })
    .catch(error => {
      return error
    });

console.log(data.length)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Logo />
    <div className="flex flex-wrap justify-center content-center gap-x-5 gap-y-10 h-[90vh]">
      <DriverStandings data = {data}/>
      <Countdown />
      <Box />
      <ConstructorStandings />
      <Box />
      <Box />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
