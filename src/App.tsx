import React from 'react';
import './App.css';

function todayPlusNDays(n: number) {
  let today = new Date();
  return new Date(today.getTime() + 1000 * 3600 * 24 * n).toLocaleDateString('pt-BR');
}

function App() {
  let today = new Date();

  let cdbData = [
    {
      "period": "Até 180",
      "aliquot": "22,5%",
      "date_start": todayPlusNDays(0),
      "date_end": todayPlusNDays(180),
    },
    {
      "period": "181 a 360",
      "aliquot": "20,0%",
      "date_start": todayPlusNDays(181),
      "date_end": todayPlusNDays(360),
    },
    {
      "period": "361 a 720",
      "aliquot": "17,5%",
      "date_start": todayPlusNDays(361),
      "date_end": todayPlusNDays(720),
    },
    {
      "period": "A partir de 721",
      "aliquot": "15,0%",
      "date_start": todayPlusNDays(721),
      "date_end": "--",
    },
  ];

  return (
    <div className="App">
      <h1 className="text-4xl">Investor's Cheatsheet</h1>
      <h2 className="text-2xl">Tabela Regressiva de Imposto de Renda CDB</h2>
      <table className="table">
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
                  <td>{item.date_start} a {item.date_end}</td>
                </tr>
              );
            })}
          </tbody>

      </table>
    </div>

  );
}

export default App;
