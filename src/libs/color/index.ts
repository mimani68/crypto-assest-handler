import chalk from 'chalk'

export function bold(message: string) {
    return chalk.greenBright(message)
}

export function yellow(message: string) {
    return chalk.yellowBright(message)
}

export function blue(message: string) {
    return chalk.blueBright(message)
}

export function green(message: string) {
    return chalk.greenBright(message)
}

export function red(message: string) {
    return chalk.redBright(message)
}

export function dim(message: string) {
    return chalk.dim(message)
}