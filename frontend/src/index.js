import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import axios from 'axios';
// import "./styles.css";
// // need to import the vis network css in order to show tooltip
// import "./network.css";

axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <App />
  // </React.StrictMode>
);
