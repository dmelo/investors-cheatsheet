import RegressiveTaxTable from './components/RegressiveTaxTable';
import ScenarioSimulation from './components/ScenarioSimulation';
import IndexList from './components/IndexList';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [ipca, setIpca] = useState<number>(4.5);
  const [cdi, setCdi] = useState<number>(11.5);

  return (
    <div className="App max-w-5xl mx-auto px-10">
      <h1 className="text-4xl">Simulação de Investimento em Renda Fixa</h1>
      <div className="w-full grid grid-cols-1 lg:flex">
        <RegressiveTaxTable/>
        <IndexList ipca={ipca} setIpca={setIpca} cdi={cdi} setCdi={setCdi}/>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 content-start">
        <ScenarioSimulation ipca={ipca} cdi={cdi} title="A"/>
        <ScenarioSimulation ipca={ipca} cdi={cdi} title="B"/>
        <ScenarioSimulation ipca={ipca} cdi={cdi} title="C"/>
      </div>
      <footer>
        <span>
          Developed by <a href="https://github.com/dmelo">Diogo Melo</a></span>
      </footer>
    </div>

  );
}

export default App;
