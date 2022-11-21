const CoinGecko = require('coingecko-api');
 
const CoinGeckoClient = new CoinGecko();
 
export async function ping() {
  let ping = await CoinGeckoClient.ping();
  console.log(ping)
};

export async function getPrice(token: string = 'bitcoin') {
    // let responce = await CoinGeckoClient.simple.price({
    //     ids: [token],
    //     vs_currencies: ['eur', 'usd'],
    // });
    // console.log(responce.data)
    let responce = await CoinGeckoClient.exchangeRates.all();
    if ( responce.code === 200 ) {
        return responce.data.token
    } else {
        return { eur: 0, usd: 0 }
    }

}
