import { createReadStream } from 'fs';
import { createInterface } from 'readline'
import { isEmpty, omit } from 'lodash';

import { log, debug, error } from '../log';
import { Transactions } from '../../interface/transactions.interfaces';
import { config } from '../../config/app.config';


async function streamLoadData(address: string, cb: Function) {
    return new Promise((resolve, reject)=>{
        let result = {};
        const readStream = createReadStream(address, 'utf-8', );
        let readLineStream = createInterface({input: readStream})
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
            // log('Data parsing completed');
            resolve(result)
        })
    })
}


function balanceStreamAggregator(jsonData: any, newData: Transactions) {
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

export async function showBalance() {
    let data: any = await streamLoadData(config.Database, balanceStreamAggregator)
    for (const key in data) {
        data = omit(data, data[key])
    }
    return data
}