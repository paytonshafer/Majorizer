//This is the main app of our application, all of the final renderings go here
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HelpPage from './pages/HelpPage';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/StaticData';
import Navbar from './components/navbar';
import ConnectionPage from './pages/ConnectionPage';
import SendRequestPage from './pages/SendRequestPage';
import ViewRequestPage from './pages/ViewRequestPage';
import BuildSchedulePage from './pages/BuildSchedulePage';
import ViewSchedulePage from './pages/ViewSchedulePage';

function App() {
  return (
    <div className="App">
      <Router>
        <DataProvider>
        <AuthProvider>
          <Navbar/>
          <Routes>
            <Route element={<LoginPage />} path="/" exact/>
            <Route element={<HomePage />} path="/home"/>
            <Route element={<HelpPage />} path="/help"/>
            <Route element={<ConnectionPage />} path="/connection" />
            <Route element={<SendRequestPage />} path="sendreq" />
            <Route element={<ViewRequestPage />} path="viewreq" />
            <Route element={<BuildSchedulePage />} path="build" />
            <Route element={<ViewSchedulePage />} path="view" />
          </Routes>
        </AuthProvider>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
