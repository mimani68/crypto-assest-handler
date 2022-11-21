import { isEmpty, unset } from 'lodash';

import { log, debug, error } from '../log';
import { TotalTransactionsRespons, Transactions } from '../../interface/transactions.interfaces';
import { config } from '../../config/app.config';
import { LoadToken } from './loadTransaction';
import { getPrice } from '../asset-price';


export class BalanceToken {

    fileAddress: string;

    constructor(dataAddress: string) {
        this.fileAddress = dataAddress
    }

    private balanceAggregator(jsonData: any, newData: Transactions) {
        if (isEmpty(jsonData) && isEmpty(newData)) {
            return {}
        }
        if (isEmpty(jsonData)) {
            let item: any = {}
            item[newData.token as string] = newData
            return item
        }
        if (isEmpty(jsonData[newData.token as string]) ) {
            jsonData[newData.token as string] = newData
            return jsonData
        }
        if (isEmpty(newData)) {
            return jsonData
        }
        if ( newData.transaction_type === 'WITHDRAWAL' ) {
            jsonData[newData.token as string].amount -= +newData.amount
        } else {
            jsonData[newData.token as string].amount += +newData.amount
        }
        return jsonData
    }

    async totalBalanceHandler() {
        debug(`Finding all transactions`)
        let result: Array<TotalTransactionsRespons> = []
        let tokenLoader = new LoadToken()
        let data: any = await tokenLoader.loadAllTokens(this.fileAddress, this.balanceAggregator)
        for (const key in data) {
            let item: TotalTransactionsRespons = {
                token: data[key].token,
                amount: data[key].amount,
                value: 0
            }
            let priceInUSD = await getPrice(item.token as string)
            item.value = priceInUSD * +item.amount
            result.push(item)
        }
        return result
    }

    async balancePerTokenHandler(token: string) {
        debug(`Finding all transactions of token '${ token }'`)
        let tokenLoader = new LoadToken()
        let data: any = await tokenLoader.loadSpecificToken(this.fileAddress, token, this.balanceAggregator)
        if (isEmpty(data)) {
            return {}
        }
        let coin: any = data[token]
        let priceInUSD = await getPrice(token as string)
        coin.value = coin.amount * priceInUSD
        unset(coin, ['timestamp'])
        unset(coin, ['token'])
        unset(coin, ['transaction_type'])
        return coin
    }

    async balanceInTimeHandler(time: string) {
        debug(`Finding all transactions in timestamp '${ time }'`)
        let tokenLoader = new LoadToken()
        let data: any = await tokenLoader.loadTokenInTime(config.Database, time, this.balanceAggregator)
        if (isEmpty(data)) {
            return {}
        }
        for (const token in data) {
            let coin: any = data[token]
            let priceInUSD = await getPrice(token as string)
            coin.value = coin.amount * priceInUSD
            unset(coin, ['timestamp'])
            unset(coin, ['token'])
            unset(coin, ['transaction_type'])
        }
        return data
    }

    async balanceFileteredBtTimeAndTokenHandler(token: string, time: number) {
        debug(`Finding all transactions in timestamp '${ time }' and token '${ token }'`)
        let tokenLoader = new LoadToken()
        let data: any = await tokenLoader.loadSpecificAndTimeRangeToken(this.fileAddress, token, +time, this.balanceAggregator)
        if (isEmpty(data)) {
            return {}
        }
        for (const token in data) {
            let coin: any = data[token]
            let priceInUSD = await getPrice(token as string)
            coin.value = coin.amount * priceInUSD
            unset(coin, ['timestamp'])
            unset(coin, ['token'])
            unset(coin, ['transaction_type'])
        }
        return data
    }
}