import { config } from "../../config/app.config"
import { blue, red, yellow } from "../color"

export function log(message: any) {
    console.log(`[${yellow(" LOG ")}] === ` + message + ` === `)
}

export function debug(message: any) {
    if ( config.Debug ) {
        if ( typeof message == 'object' ) {
            console.log(`[${blue("DEBUG")}] === ` + JSON.stringify(message) + ` === `)
        } else {
            console.log(`[${blue("DEBUG")}] === ` + message + ` === `)
        }
    }
}

export function error(message: any) {
    console.log(`[${red("ERROR")}] === ` + message + ` === `)
}