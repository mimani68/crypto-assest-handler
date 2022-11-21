import { isEmpty } from 'lodash';

import { log, debug, error } from '../log';
import { TotalTransactionsRespons, Transactions } from '../../interface/transactions.interfaces';
import { config } from '../../config/app.config';
import { streamFileLoading } from './loadTransaction';


function totalBalanceAggregator(jsonData: any, newData: Transactions) {
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

export async function loadAllTokens(address: string, cb: Function) {
    return new Promise((resolve, reject)=>{
        let result = {};
        let readLineStream = streamFileLoading(address)
        readLineStream.on('line', (line) => {
            let lineArray = line.split(',')
            if ( lineArray[0] !== "timestamp" ) {
                let transactionRecord: Transactions = {
                    timestamp:        +lineArray[0],
                    transaction_type:  lineArray[1],
                    token:             lineArray[2],
                    amount:           +lineArray[3]
                }
                result = cb(result, transactionRecord)
            }
        });
        readLineStream.on('error', (error) => {
            error(error.message)
            reject(error.message)
        });
        readLineStream.on('close', () => {
            resolve(result)
        })
    })
}

export async function totalBalanceHandler() {
    let result: Array<TotalTransactionsRespons> = []
    let data: any = await loadAllTokens(config.Database, totalBalanceAggregator)
    for (const key in data) {
        let item: TotalTransactionsRespons = {
            timestamp: data[key].timestamp,
            token: data[key].token,
            amount: data[key].amount,
        }
        result.push(item)
    }
    return result
}