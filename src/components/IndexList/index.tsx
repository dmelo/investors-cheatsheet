import { useEffect } from 'react';
import { getIPCA } from '../../services/api';

type IndexListProps = {
    ipca: number;
    setIpca: (value: number) => void;
    cdi: number;
    setCdi: (value: number) => void;
}

const IndexList: React.FC<IndexListProps> = (props) => {

  useEffect(() => {
    getIPCA(
      (data) => {
        props.setIpca(data.toFixed(2));
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);


    return (
        <div className="border-solid border-2 border-primary m-2 lg:w-1/4">
            <h2 className="text-2xl">Índices</h2>
            <div className="flex m-1">
                <div className="w-2/3">
                    IPCA (Ult. 12 meses)
                </div>
                <div className="w-1/3">
                    <input
                        type="number"
                        min="0.00"
                        step="0.1"
                        className="w-full border-solid border-2 border-primary"
                        id="inline-yield"
                        value={props.ipca}
                        onChange={e => props.setIpca(parseFloat(e.target.value) || 0.0)}/>

                </div>
            </div>
            <div className="flex m-1">
                <div className="w-2/3">
                    CDI
                </div>
                <div className="w-1/3">
                    <input
                        type="number"
                        min="0.00"
                        step="0.1"
                        className="w-full border-solid border-2 border-primary"
                        id="inline-yield"
                        value={props.cdi}
                        onChange={e => props.setCdi(parseFloat(e.target.value) || 0.0)}/>

                </div>
            </div>
        </div>    
    )
};

export default IndexList;