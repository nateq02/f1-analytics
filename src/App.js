import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from 'react'
import axios from 'axios'
import { Home } from "./pages/Home"
import { Results } from "./pages/Results"
import { Standings } from "./pages/Standings"

function App() {
  useEffect(() => {
    axios.post("http://127.0.0.1:8000/update").catch(error => {
      console.error(error);
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };