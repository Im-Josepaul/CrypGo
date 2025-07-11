import currencyapi from '@everapi/currencyapi-js';
import {CryptoNames} from "./data"
//
const client = new currencyapi(process.env.NEXT_PUBLIC_API_KEY);
const allCryptos = Object.keys(CryptoNames).join(',');
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2
});

async function currPrice(): Promise<any>{
    let response: any = await client.latest({
        base_currency: 'INR',
        currencies: allCryptos
    })
    response = response.data;
    for (const key in response) {
        if (response.hasOwnProperty(key)) {
            response[key].value = formatter.format(Math.round(1 / response[key].value));
        }
    }
    return response;
}

export default currPrice;
