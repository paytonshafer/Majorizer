//This is the main app of our application, all of the final renderings go here
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<LoginPage />} path="/" exact/>
            <Route element={<HomePage />} path="/home"/>
          </Routes>
        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;
