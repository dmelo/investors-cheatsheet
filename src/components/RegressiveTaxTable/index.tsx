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
  monthlyTargetProfit: number;
    // Define props here
};

const RegressiveTaxTable: React.FC<RegressiveTaxTableProps> = (props) => {
  let cdbData = [
    {
      "period": "Até 180",
      "aliquot": 22.5,
      "date_start": todayPlusNDays(0),
      "date_end": todayPlusNDays(180),
      "prefixed": calcPrefixedValue(props.monthlyTargetProfit, 22.5)
    },
    {
      "period": "181 a 360",
      "aliquot": 20.0,
      "date_start": todayPlusNDays(181),
      "date_end": todayPlusNDays(360),
      "prefixed": calcPrefixedValue(props.monthlyTargetProfit, 20.0)
    },
    {
      "period": "361 a 720",
      "aliquot": 17.5,
      "date_start": todayPlusNDays(361),
      "date_end": todayPlusNDays(720),
      "prefixed": calcPrefixedValue(props.monthlyTargetProfit, 17.5)
    },
    {
      "period": "A partir de 721",
      "aliquot": 15.0,
      "date_start": todayPlusNDays(721),
      "date_end": "--",
      "prefixed": calcPrefixedValue(props.monthlyTargetProfit, 15.0)
    },
  ];

    return (

    <div className="border-solid border-2 border-black">
    <h2 className="text-2xl">Tabela Regressiva de Imposto de Renda</h2>
    <table className="table">
        <thead>         
            <tr>
            <th>Período (dias a partir da aplicacão)</th>
            <th>Alíquota (%)</th>
            <th>Data correspondente a partir de Hoje</th>
            <th>Prefixado (%)</th>
            </tr>
        </thead>
        <tbody>
            {cdbData.map((item, index) => {
            return (
                <tr key={index} className="green">
                <td>{item.period}</td>
                <td>{item.aliquot.toFixed(1)}</td>
                <td>{item.date_start} a {item.date_end}</td>
                <td>{item.prefixed.toFixed(2)}</td>
                </tr>
            );
            })}
        </tbody>

    </table>
    </div>
    );
};

export default RegressiveTaxTable;