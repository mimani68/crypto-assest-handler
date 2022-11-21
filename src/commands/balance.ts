import arg from 'arg';

import { bold, dim } from "../libs/color";
import { debug } from "../libs/log";
import { showBalance } from '../libs/assets/main';
import { printOutput } from '../libs/print';

export function help () {
    return `
  Usage: ${ bold('Show account balance [options]') }

    ${dim('Options:')}

      -h, --help         Displays complete help

`
}

export async function main() {
  const args = arg(
    {
      '--help': Boolean,
      '--blockchain': Boolean,
      '--network': String,
      '-h': '--help',
      '-b': '--blockchain',
      '-n': '--network'
    },
    { permissive: true }
  )

  debug(`Parsed target: ${args._}`)
  let result = await showBalance()
  printOutput(result)
}