import React, {useState} from 'react';
import RegressiveTaxTable from './components/RegressiveTaxTable';
import ScenarioSimulation from './components/ScenarioSimulation';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1 className="text-4xl">Investor's Cheatsheet</h1>
      <RegressiveTaxTable/>
      <ScenarioSimulation ipca={4.5} cdi={11.5}/>
    </div>

  );
}

export default App;
