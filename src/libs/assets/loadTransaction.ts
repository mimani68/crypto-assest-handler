import { createReadStream } from 'fs';
import { createInterface } from 'readline'

import { Transactions } from '../../interface/transactions.interfaces';


export class LoadToken {

    static streamFileLoading(address: string) {
        const readStream = createReadStream(address, 'utf-8');
        return createInterface({input: readStream})
    }

    async loadAllTokens(address: string, cb: Function) {
        return new Promise((resolve, reject)=>{
            let result = {};
            let readLineStream = LoadToken.streamFileLoading(address)
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

    async loadTokenInTime(address: string, time: string, cb: Function) {
        return new Promise((resolve, reject)=>{
            let result = {};
            let readLineStream = LoadToken.streamFileLoading(address)
            readLineStream.on('line', (line) => {
                let lineArray = line.split(',')
                if ( lineArray[0] !== "timestamp" && lineArray[0] === time ) {
                    let transactionRecord: Transactions = {
                        timestamp:        +lineArray[0],
                        transaction_type:  lineArray[1],
                        token:             lineArray[2],
                        amount:           +lineArray[3]
                    }
                    result = cb(result, transactionRecord)
                }
            });
            readLineStream.on('error', (error: any) => {
                error(error.message)
                reject(error.message)
            });
            readLineStream.on('close', () => {
                resolve(result)
            })
        })
    }

    async loadSpecificToken(address: string, token: string, cb: Function) {
        return new Promise((resolve, reject)=>{
            let result = {};
            let readLineStream = LoadToken.streamFileLoading(address)
            readLineStream.on('line', (line: any) => {
                let lineArray = line.split(',')
                if ( lineArray[0] !== "timestamp" && lineArray[2] === token ) {
                    let transactionRecord: Transactions = {
                        timestamp:        +lineArray[0],
                        transaction_type:  lineArray[1],
                        token:             lineArray[2],
                        amount:           +lineArray[3]
                    }
                    result = cb(result, transactionRecord)
                }
            });
            readLineStream.on('error', (error: any) => {
                error(error.message)
                reject(error.message)
            });
            readLineStream.on('close', () => {
                resolve(result)
            })
        })
    }

    async loadSpecificAndTimeRangeToken(address: string, token: string, timestamp: number, cb: Function) {
        return new Promise((resolve, reject)=>{
            let result = {};
            let readLineStream = LoadToken.streamFileLoading(address)
            readLineStream.on('line', (line: any) => {
                let lineArray = line.split(',')
                if ( lineArray[0] !== "timestamp" &&  +lineArray[0] === +timestamp && lineArray[2] === token ) {
                    let transactionRecord: Transactions = {
                        timestamp:        +lineArray[0],
                        transaction_type:  lineArray[1],
                        token:             lineArray[2],
                        amount:           +lineArray[3]
                    }
                    result = cb(result, transactionRecord)
                }
            });
            readLineStream.on('error', (error: any) => {
                error(error.message)
                reject(error.message)
            });
            readLineStream.on('close', () => {
                resolve(result)
            })
        })
    }

}