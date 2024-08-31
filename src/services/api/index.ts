import axios from 'axios';

export const getIPCA = (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    axios.get("http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PRECOS12_IPCAG12')")
        .then((response) => {
            let ipca = null;
            // console.log(response.data);
            // inside data.value[] we have:
            // NIVNOME: "",
            // SERCODIGO: "PRECOS12_IPCAG12",
            // TERCODIGO: "",
            // VALDATA: "2024-07-01T00:00:00-03:00",
            // VALVALOR: 0.38
            const dateLimit = new Date();
            dateLimit.setUTCFullYear(dateLimit.getFullYear() - 1);
            dateLimit.setUTCDate(1);
            dateLimit.setUTCHours(0);
            dateLimit.setUTCMinutes(0);
            dateLimit.setUTCSeconds(0);
            for (let i = 0; i < response.data.value.length; i++) {
                const item = response.data.value[i];
                if ((new Date(item.VALDATA)) < dateLimit) {
                    continue;
                }

                console.log(item.VALDATA);
                if (null == ipca) {
                    ipca = 1 + (item.VALVALOR / 100.0);
                } else {
                    ipca *= 1 + (item.VALVALOR / 100.0);
                }
            }

            if (null == ipca) {
                onError("Could not calculate IPCA");
                return;
            }
            onSuccess(100.0 * (ipca - 1.0));
        })
        .catch((error) => {
            onError(error);
        });
}