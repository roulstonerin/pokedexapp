// External dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

// Internal dependencies
import App from './App';

// Styles
import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//const axios = require('axios');

console.log("We haven't called the api yet");

axios.get('http://localhost:5000/api/data')
  .then(response => {
    const data = response.data;
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
console.log("We have successfully called the api!!");