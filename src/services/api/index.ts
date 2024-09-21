import axios from 'axios';

export const getIPCA = (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    axios.get("https://api-rendafixa.diogomelo.net/v1/ipca/cumulative?n_months=12")
        .then((response) => {
            /**
             * {
             *  "cumulative": 4.2375990160564925,
             *  "date_start": "2023-09-01",
             *  "date_end": "2024-08-01"
             * }
             */
            onSuccess(response.data.cumulative);
        })
        .catch((error) => {
            onError(error);
        });
}

export const getCDI = (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    axios.get("https://api-rendafixa.diogomelo.net/v1/cdi/cumulative?n_months=12")
        .then((response) => {
            /**
             * {
             *  "cumulative": 4.2375990160564925,
             *  "date_start": "2023-09-01",
             *  "date_end": "2024-08-01"
             * }
             */
            onSuccess(response.data.cumulative);
        })
        .catch((error) => {
            onError(error);
        });
}