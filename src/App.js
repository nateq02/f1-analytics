import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import routes from "./routes"
import { Home } from "./pages/Home"
import { Results } from "./pages/Results"
import { Standings } from "./pages/Standings"

function App() {
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