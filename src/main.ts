import { isEmpty } from "lodash";

import { bold } from "./libs/color";
import { debug, error } from "./libs/log";

export async function main() {

    let subcommand = process.argv[2]
    if ( isEmpty(subcommand) ) {
        subcommand = 'balance'
    }
    debug(`Selected command ${bold(subcommand)}`)

    try {
        const command = await import(`./commands/${subcommand}`)
        await command.main()
    } catch (e: any) {
        error("Some problems occuer as command '" + subcommand + "' called")
        error(e)
        process.exit(1)
    }

}