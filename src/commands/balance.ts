import arg from 'arg';

import { bold, green, dim } from "../libs/color";
import { debug, error } from "../libs/log";

export function help () {
    return `
  Usage: ${ bold('dcl build [options]') }

    ${dim('Options:')}

      -h, --help                Displays complete help
      -p, --port        [port]  Select a custom port for the development server
      -t, --target              Specifies the address and port for the target catalyst server. Defaults to peer.decentraland.org
      -t, --target-content      Specifies the address and port for the target content server. Example: 'peer.decentraland.org/content'. Can't be set together with --target
      -b, --no-browser          Do not open a new browser window
      --skip-version-checks     Skip the ECS and CLI version checks, avoid the warning message and launch anyway
      --skip-build              Skip build before deploy
      --skip-validations        Skip permissions verifications on the client side when deploying content

    ${dim('Example:')}

    - Deploy your scene:

      ${green('$ dcl deploy')}

    - Deploy your scene to a specific content server:

    ${green('$ dcl deploy --target my-favorite-catalyst-server.org:2323')}
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

  if (!args._[1]) {
    error('Please provide a target to retrieve data')
  }

  debug(`Parsed target: ${args._}`)
}