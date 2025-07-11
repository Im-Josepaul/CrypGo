declare module '@everapi/currencyapi-js' {
  interface CurrencyApiOptions {
    apiKey: string;
  }

  interface CurrencyApiResponse {
    data: Record<string, any>;
    meta: any;
  }

  export default class CurrencyAPI {
    latest(arg0: { base_currency: string; currencies: string; }): any {
        throw new Error('Method not implemented.');
    }
    constructor(apiKeyOrOptions: string | CurrencyApiOptions | undefined);
    currencies(): Promise<CurrencyApiResponse>;
    // Add other methods as needed
  }
}
