const CoinGecko = require('coingecko-api');

import { debug, error, log } from "../log";

export async function getPrice(token: string = 'btc'): Promise<number> {
    const CoinGeckoClient = new CoinGecko();
    let response = await CoinGeckoClient.coins.markets();
    let market = response.data
    if ( response.code === 200 ) {
        for (const key in market) {
            if ( (market[key].symbol).toUpperCase() === token.toUpperCase() ) {
                debug(market[key])
                log(`Price of '${ token }' is '${market[key].current_price}' USD`)
                return market[key].current_price
            }
        }
        return 0
    } else {
        error("Unable fetch latest price of token '" + token + "'")
        return 0
    }
}
