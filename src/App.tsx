import React from 'react';
import './App.css';

function App() {
  let today = new Date();

  let cdbData = [
    {
      "period": "Até 180",
      "aliquot": "22,5%",
      "date": today.toLocaleDateString('pt-BR')
    },
    {
      "period": "181 a 360",
      "aliquot": "20,0%",
      "date": (new Date(today.getTime() + 1000 * 3600 * 24 * 181)).toLocaleDateString('pt-BR')
    },
    {
      "period": "361 a 720",
      "aliquot": "17,5%",
      "date": (new Date(today.getTime() + 1000 * 3600 * 24 * 361)).toLocaleDateString('pt-BR')
    },
    {
      "period": "A partir de 721",
      "aliquot": "15,0%",
      "date": (new Date(today.getTime() + 1000 * 3600 * 24 * 721)).toLocaleDateString('pt-BR')
    },
  ];

  return (
    <div className="App">
      <h1 className="underline font-bold">Investor's Cheatsheet</h1>
      <h2>Tabela Regressiva de Imposto de Renda CDB</h2>
      <table className="hover:table-fixed">
          <thead>         
            <tr>
              <th>Período (dias a partir da aplicacão)</th>
              <th>Alíquota</th>
              <th>Data correspondente a partir de Hoje</th>
            </tr>
          </thead>
          <tbody>
            {cdbData.map((item, index) => {
              return (
                <tr key={index} className="green">
                  <td>{item.period}</td>
                  <td>{item.aliquot}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          </tbody>

      </table>
    </div>

  );
}

export default App;
