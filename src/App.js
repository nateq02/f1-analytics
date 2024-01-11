import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import routes from "./routes"
import { Home } from "./pages/Home"
import { Results } from "./pages/Results"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };