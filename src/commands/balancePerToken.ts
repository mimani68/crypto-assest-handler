import arg from 'arg';

import { bold, dim } from "../libs/color";
import { debug } from "../libs/log";
import { printOutput } from '../libs/print';
import { BalanceToken } from '../libs/assets/balance';
import { config } from '../config/app.config';

export function help () {
    return `
  Description: 'Show account balance per token'

  Usage: ${ bold('token [options]') }

    ${dim('Options:')}
      -n, --name     Symbol of token
      -h, --help     Displays complete help
`
}

export async function main() {
  const args = arg(
    {
      '--name': String,
      '--help': Boolean,
      '-n': '--name',
      '-h': '--help'
    },
    { permissive: true }
  )
  
  debug(`Command options: ${args}`)

  if (args['--help'] || args['-h']) {
    printOutput(help())
  }

  let token = args['--name'] as string
  let tokenBalanceOperator = new BalanceToken(config.Database)
  printOutput(await tokenBalanceOperator.balancePerTokenHandler(token.toUpperCase()))
}