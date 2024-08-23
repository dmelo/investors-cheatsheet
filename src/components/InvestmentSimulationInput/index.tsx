import React from 'react';

type InvestmentSimulationInputProps = {
    monthlyTargetProfit: number;
    setMonthlyTargetProfit: (value: number) => void;
    // Define props here
};

const InvestmentSimulationInput: React.FC<InvestmentSimulationInputProps> = (props) => {
    return (
        <div className="border-solid border-2 border-black border-b-0">
            <form className="w-full">
                <div className="md:flex md:items-center m-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-target-profit">
                            Rentabilidade Mensal Alvo (%)
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={props.monthlyTargetProfit}
                            onChange={e => props.setMonthlyTargetProfit(parseFloat(e.target.value) || 0.0)}
                            type="number"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" id="inline-target-profit"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InvestmentSimulationInput;