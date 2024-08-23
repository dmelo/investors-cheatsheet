import React, {useState} from 'react';
import RegressiveTaxTable from './components/RegressiveTaxTable';
import InvestmentSimulationInput from './components/InvestmentSimulationInput';
import './App.css';

function App() {
  const [monthlyTargetProfit, setMonthlyTargetProfit] = useState<number>(0);

  return (
    <div className="App">
      <h1 className="text-4xl">Investor's Cheatsheet</h1>
      <InvestmentSimulationInput setMonthlyTargetProfit={setMonthlyTargetProfit} monthlyTargetProfit={monthlyTargetProfit}/>
      <RegressiveTaxTable monthlyTargetProfit={monthlyTargetProfit}/>
    </div>

  );
}

export default App;
