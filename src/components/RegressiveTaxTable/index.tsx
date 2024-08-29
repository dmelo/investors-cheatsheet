import React from "react"

function todayPlusNDays(n: number) {
  let today = new Date();
  return new Date(today.getTime() + 1000 * 3600 * 24 * n).toLocaleDateString('pt-BR');
}

function percentageToDecimal(percentage: number) {
  return percentage / 100.0;
}

function decimalToPercentage(decimal: number) {
  return decimal * 100.0;
}

function calcPrefixedValue(monthlyPercentage: number, taxPercentage: number) {
  const monthlyTarget: number = percentageToDecimal(monthlyPercentage);
  const tax: number = percentageToDecimal(taxPercentage);

  return decimalToPercentage((Math.pow(1.0 + monthlyTarget, 12) - 1) / (1 - tax));
}

type RegressiveTaxTableProps = {
};

const RegressiveTaxTable: React.FC<RegressiveTaxTableProps> = (props) => {
  let cdbData = [
    {
      "period": "Até 180",
      "aliquot": 22.5,
      "date_start": todayPlusNDays(0),
      "date_end": todayPlusNDays(180),
    },
    {
      "period": "181 a 360",
      "aliquot": 20.0,
      "date_start": todayPlusNDays(181),
      "date_end": todayPlusNDays(360),
    },
    {
      "period": "361 a 720",
      "aliquot": 17.5,
      "date_start": todayPlusNDays(361),
      "date_end": todayPlusNDays(720),
    },
    {
      "period": "A partir de 721",
      "aliquot": 15.0,
      "date_start": todayPlusNDays(721),
      "date_end": "--",
    },
  ];

    return (

    <div className="border-solid border-2 border-primary m-2 overflow-x-auto">
      <h2 className="text-2xl">Tabela Regressiva de Imposto de Renda</h2>
      <table className="table w-full">
        <thead>         
          <tr>
          <th>Período (dias a partir da aplicacão)</th>
          <th>Alíquota (%)</th>
          <th>Data correspondente a partir de Hoje</th>
          </tr>
        </thead>
        <tbody>
          {cdbData.map((item, index) => {
          return (
              <tr key={index} className="green">
              <td>{item.period}</td>
              <td>{item.aliquot.toFixed(1)}</td>
              <td>{item.date_start} a {item.date_end}</td>
              </tr>
          );
          })}
        </tbody>

      </table>
    </div>
    );
};

export default RegressiveTaxTable;