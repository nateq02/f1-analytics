import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Logo, Box, DriverStandings, ConstructorStandings, Countdown} from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Logo />
    <div className="flex flex-wrap justify-center content-center gap-x-5 gap-y-10 h-[90vh]">
      <DriverStandings />
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
