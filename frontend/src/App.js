import './App.css';
import UploadData from './components/UploadData';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import store from './stores/store';
import SideBar from './components/SideBar'
import SideBarTwo from "./components/SideBarTwo"
import NavbarComp from './components/NavbarComp';
import GraphComponent from './components/GraphComponent';
import FlowGraph from './components/FlowGraph';


Chart.register(CategoryScale);

function App() {
  // const Store = store()

  // const accNos = Object.keys(Store.data)
  // console.log(accNos)


  return (
    <div className="App">
      <BrowserRouter>
      <SideBarTwo>
      <NavbarComp />
        <Routes>
          <Route index element={<UploadData />} />
          <Route path='/dashboard/:accNo' element={<Dashboard />} />
          <Route path='/graph/:acc' element={<GraphComponent />} />
        </Routes>
        </SideBarTwo>
      </BrowserRouter>
    </div>
  );
}

export default App;
