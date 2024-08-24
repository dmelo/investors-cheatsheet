import React, { useEffect } from 'react';

type ScenarioSimulationProps = {
    ipca: number;
    cdi: number;
};

type ScenarioSimulationIn = {
    investment: number;
    index: string;
    yieldValue: number;
    dueDate: string;
    yieldTiming: string;
    taxType: string;
    ipca: number;
    cdi: number;
};

type ScenarioSimulationOut = {
    grossValue: number;
    grossPercentage: number;
    incomeTax: number;
    incomeTaxPercentage: number;
    netValue: number;
    netPercentage: number;
};

function yearlyPercentageToMonthlyDecimal(yearlyPercentage: number): number {
    return Math.pow(1.0 + (yearlyPercentage / 100.0), 1.0 / 12.0) - 1.0;
}

function monthDiff(d1: Date, d2: Date): number  {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

function calculateResults(data: ScenarioSimulationIn): ScenarioSimulationOut {
    let totalYearlyPercentage: number = data.yieldValue;
    switch (data.index) {
        case 'ipca-plus':
            totalYearlyPercentage = data.yieldValue + data.ipca;
            break;
        case 'cdi-plus':
            totalYearlyPercentage = data.yieldValue + data.cdi;
            break;
        case 'cdi':
            totalYearlyPercentage = data.yieldValue * data.cdi / 100.0;
            break;
        default:
            totalYearlyPercentage = data.yieldValue;
    }

    const monthlyYieldDecimal: number = yearlyPercentageToMonthlyDecimal(totalYearlyPercentage);
    const qtyMonths: number = monthDiff(new Date(), new Date(data.dueDate));
    const grossDecimal: number = Math.pow(1.0 + monthlyYieldDecimal, qtyMonths) - 1.0;
    const grossValue: number = data.investment * (1 + grossDecimal);

    return {
        grossValue: grossValue,
        grossPercentage: grossDecimal * 100.0,
        incomeTax: 0.0,
        incomeTaxPercentage: 0.0,
        netValue: 0.0,
        netPercentage: 0.0,
    };
}

const ScenarioSimulation: React.FC<ScenarioSimulationProps> = (props) => {
    const [investment, setInvestment] = React.useState<number>(0.0);
    const [index, setIndex] = React.useState<string>('ipca');
    const [yieldValue, setYieldValue] = React.useState<number>(0.0);
    const [dueDate, setDueDate] = React.useState<string>('');
    const [yieldTiming, setYieldTiming] = React.useState<string>('all-at-the-end');
    const [taxType, setTaxType] = React.useState<string>('regressive');
    const [results, setResults] = React.useState<ScenarioSimulationOut | null>(null);

    useEffect(() => {
        console.log(investment, index, yieldValue, dueDate, yieldTiming, taxType);
        setResults(
            calculateResults(
                {
                    investment: investment,
                    index: index,
                    yieldValue: yieldValue,
                    dueDate: dueDate,
                    yieldTiming: yieldTiming,
                    taxType: taxType,
                    ipca: props.ipca,
                    cdi: props.cdi
                }
            )
        );
    }, [investment, index, yieldValue, dueDate, yieldTiming, taxType, props.ipca, props.cdi]);

    return (
        <div className="w-1/2 border-solid border-2 border-black m-2">
            <h2 className="text-2xl">Simulação de Cenário</h2>
            <form className="w-full">

                 <div className="md:flex md:items-center m-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-investment">
                            Valor Investido (R$)
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            type="number"
                            min="0.00"
                            step="0.01"
                            className="" id="inline-investment"
                            onChange={e => setInvestment(parseFloat(e.target.value) || 0.0)}/>

                    </div>
                </div>
               
                <div className="md:flex md:items-center m-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-index">
                            Índice
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <select id="inline-index" onChange={e => setIndex(e.target.value)}>
                            <option value="ipca-plus">IPCA +</option>
                            <option value="prefixed">Prefixado</option>
                            <option value="cdi-plus">CDI +</option>
                            <option value="cdi">% do CDI</option>
                        </select>
                    </div>
                </div>

                <div className="md:flex md:items-center m-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-yield">
                            Rendimento Anual (%)
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            type="number"
                            className=""
                            id="inline-yield"
                            onChange={e => setYieldValue(parseFloat(e.target.value) || 0.0)}/>

                    </div>
                </div>

                <div className="md:flex md:items-center m-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-due-date">
                            Data de Vencimento
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            type="date"
                            className=""
                            id="inline-due-date"
                            onChange={e => setDueDate(e.target.value)}/>

                    </div>
                </div>

                <div className="md:flex md:items-center m-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-yield-timing">
                            Pagamento dos Rendimentos
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <select id="inline-yield-timing" onChange={e => setYieldTiming(e.target.value)}>
                            <option value="all-at-the-end">No Venvimento</option>
                            <option value="semiannual">Semestral</option>
                            <option value="monthly">Mensal</option>
                        </select>
                    </div>
                </div>

                <div className="md:flex md:items-center m-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-tax-type">
                            Imposto de Renda
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <select id="inline-tax-type" onChange={e => setTaxType(e.target.value)}>
                            <option value="regressive">Regressivo</option>
                            <option value="exempt">Isento</option>
                        </select>
                    </div>
                </div>


            </form>

            {results && (
                <>
                    <h3>Resultados</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Valor Bruto</td>
                                <td>R$ {results.grossValue.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Percentual Bruto</td>
                                <td>{results.grossPercentage.toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td>Imposto de Renda</td>
                                <td>R$ {results.incomeTax.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Percentual Imposto de Renda</td>
                                <td>{results.incomeTaxPercentage.toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td>Valor Líquido</td>
                                <td>R$ {results.netValue.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Percentual Líquido</td>
                                <td>{results.netPercentage.toFixed(2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ScenarioSimulation;