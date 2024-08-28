import RegressiveTaxTable from './components/RegressiveTaxTable';
import ScenarioSimulation from './components/ScenarioSimulation';
import './App.css';

function App() {
  const cdi = 11.5;
  const ipca = 4.5;

  return (
    <div className="App">
      <h1 className="text-4xl">Simulação de Investimento em Renda Fixa</h1>
      <RegressiveTaxTable/>
      <div className="w-full grid grid-cols-3 content-start">
        <ScenarioSimulation ipca={ipca} cdi={cdi} title="A"/>
        <ScenarioSimulation ipca={ipca} cdi={cdi} title="B"/>
        <ScenarioSimulation ipca={ipca} cdi={cdi} title="C"/>
      </div>
    </div>

  );
}

export default App;
