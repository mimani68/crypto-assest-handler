import arg from 'arg';

import { bold, dim } from "../libs/color";
import { debug } from "../libs/log";
import { printOutput } from '../libs/print';
import { BalanceToken } from '../libs/assets/balance';
import { config } from '../config/app.config';

export function help () {
    return `
    Description: 'Show account total assests overview '

    Usage: ${ bold('[options]') }
  
      ${dim('Options:')}
        -h, --help     Displays complete help
`
}

export async function main() {
  const args = arg(
    {
      '--help': Boolean,
      '-h': '--help'
    },
    { permissive: true }
  )
  
  debug(`Command options: ${args}`)

  if (args['--help'] || args['-h']) {
    printOutput(help())
  }

  let result = new BalanceToken(config.Database)
  printOutput(await result.totalBalanceHandler())
}