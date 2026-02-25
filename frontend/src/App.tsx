import { useState } from 'react';
import './App.css';
import HealthCheck from './components/HealthCheck';

function App() {
  return (
    <div className="App">
      <h1>Ben's Job Tracker is Live!</h1>
      <HealthCheck />
    </div>
  );
}

export default App;
