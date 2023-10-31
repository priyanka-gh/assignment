import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Module from './components/Module';
import TimerCard from './components/TimerCard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/module" element={<Module />} />
        <Route path='/timer' element={<TimerCard/>} />
      </Routes>
    </Router>
  );
}

export default App;
