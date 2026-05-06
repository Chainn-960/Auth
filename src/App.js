import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signin from './components/Signin';
import Forgot from './components/Forgot';
import Success from './components/Success';
import  './Success.css';
import './Login.css';
import './Signin.css';

function App() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
  <Route path="/signin" element={<Signin />} />
    <Route path="/forgot" element={<Forgot />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
