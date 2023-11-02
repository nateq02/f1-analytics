import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import routes from "./routes"
import { Logo, Box, Home } from "./pages/Home"
import { Standings } from "./pages/Standings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </BrowserRouter>
  );
}

export { Logo, Box, App };