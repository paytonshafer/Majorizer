//This file will connect the root to the App.js file and put it in the root
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); //This gets the root div so we can add to it
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);