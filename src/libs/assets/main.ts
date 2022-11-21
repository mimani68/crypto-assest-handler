import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { mapValues, groupBy, omit, sumBy } from 'lodash';
import lodashObject = require('lodash');

import { log, debug, error } from '../log';
import { Transactions } from '../../interface/transactions.interfaces';

async function loadData(address: string) {
    let data;
    try {
        data = await readFileSync(address, { encoding: 'utf8' });
        debug(data);
    } catch (err) {
        error("We faced with problem once try load file: " + address);
        debug(err);
    }
    return data
}

export async function showBalance() {
    let rawCsvData = await loadData('/home/dev/project/propine/source/sample/sample.csv')
    let jsonData: Array<Transactions> = parse(rawCsvData as string, {
        columns: true,
        skip_empty_lines: true
    });
    var result = lodashObject(jsonData)
        .groupBy('token')
        .map((objs, key) => ({
            'token': key,
            'value': sumBy(objs, function(element: Transactions) {
                return +element.amount
            }) }))
        .value();
    log(result)

}
