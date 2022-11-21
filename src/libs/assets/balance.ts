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
        let result: Array<TotalTransactionsRespons> = []
        let tokenLoader = new LoadToken()
        let data: any = await tokenLoader.loadAllTokens(this.fileAddress, this.balanceAggregator)
        for (const key in data) {
            let item: TotalTransactionsRespons = {
                token: data[key].token,
                amount: data[key].amount,
            }
            item.amount = await getPrice(item.token as string)
            result.push(item)
        }
        return result
    }

    async balancePerTokenHandler(token: string) {
        let tokenLoader = new LoadToken()
        let data: any = await tokenLoader.loadSpecificToken(this.fileAddress, token, this.balanceAggregator)
        if (isEmpty(data)) {
            return {}
        }
        unset(data[token], ['token'])
        unset(data[token], ['transaction_type'])
        return data[token]
    }

    async balanceInTimeHandler(time: string) {
        let tokenLoader = new LoadToken()
        let data: any = await tokenLoader.loadTokenInTime(config.Database, time, this.balanceAggregator)
        if (isEmpty(data)) {
            return {}
        }
        for (const token in data) {
            unset(data[token], 'transaction_type')
        }
        return data
    }
}