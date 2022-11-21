import { bold } from "./libs/color";
import { debug, error } from "./libs/log";

export async function main() {

    const subcommand = process.argv[2]
    if (!subcommand) {
        subcommand == 'help'
    }
    debug(`Selected command ${bold(subcommand)}`)

    try {
        const command = await import(`./commands/${subcommand}`)
        await command.main()
    } catch (e: any) {
        error("No similar command in the program")
        debug(e)
        process.exit(1)
    }

}