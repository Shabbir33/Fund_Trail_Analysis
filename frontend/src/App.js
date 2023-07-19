import logo from './logo.svg';
import './App.css';
import UploadData from './components/UploadData';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from './components/Dashboard';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route index element={<UploadData />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
