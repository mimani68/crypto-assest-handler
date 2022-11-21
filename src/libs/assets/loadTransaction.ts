import { createReadStream } from 'fs';
import { createInterface } from 'readline'

export function streamFileLoading(address: string) {
    const readStream = createReadStream(address, 'utf-8');
    return createInterface({input: readStream})
}


