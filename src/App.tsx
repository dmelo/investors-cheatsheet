import React, {useState} from 'react';
import RegressiveTaxTable from './components/RegressiveTaxTable';
import ScenarioSimulation from './components/ScenarioSimulation';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1 className="text-4xl">Investor's Cheatsheet</h1>
      <RegressiveTaxTable/>
      <ScenarioSimulation/>
    </div>

  );
}

export default App;
