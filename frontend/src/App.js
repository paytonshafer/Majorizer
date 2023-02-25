//This is the main app of our application, all of the final renderings go here
import './App.css';
import React from 'react';
import LoginPage from './pages/LoginPage';
import Navbar from '../src/components/Navbar';
function App() {
  return (
    <div className="App">
      <React.Fragment><Navbar/></React.Fragment>
      <p>This is our react app!</p>
      
      <LoginPage />
    </div>
  );
}

export default App;
