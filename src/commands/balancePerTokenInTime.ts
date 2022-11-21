import arg from 'arg';

import { bold, dim } from "../libs/color";
import { debug } from "../libs/log";
import { printOutput } from '../libs/print';
import { BalanceToken } from '../libs/assets/balance';
import { config } from '../config/app.config';

export function help () {
    return `
  Description: 'Show account balance per token and in certain time'

  Usage: ${ bold('filter [options]') }

    ${dim('Options:')}
      -n, --name     Symbol of token
      -t, --time     Timestamp of transction
      -h, --help     Displays complete help
`
}

export async function main() {
  const args = arg(
    {
      '--name': String,
      '--timestamp': Number,
      '--help': Boolean,
      '-n': '--name',
      '-t': '--timestamp',
      '-h': '--help'
    },
    { permissive: true }
  )
  
  debug(`Command options: ${args}`)

  if (args['--help'] || args['-h']) {
    printOutput(help())
  }

  let time = args['--timestamp'] as Number
  let token = args['--name'] as string
  let tokenBalanceOperator = new BalanceToken(config.Database)
  printOutput(await tokenBalanceOperator.balanceFileteredBtTimeAndTokenHandler(token.toUpperCase(), +time))
}