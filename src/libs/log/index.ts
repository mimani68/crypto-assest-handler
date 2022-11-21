import { config } from "../../config/app.config"

export function log(message: any) {
    console.log(message)
}

export function debug(message: any) {
    if ( config.Debug ) {
        console.log(message)
    }
}

export function error(message: any) {
    console.error(message)
}