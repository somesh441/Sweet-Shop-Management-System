import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Welcome from './components/Welcome/Welcome';
import CustomerDashboard from './components/CustomerDashboard';
import TestConnection from './components/TestConnection';
import './custom.css';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/test" element={<TestConnection />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
