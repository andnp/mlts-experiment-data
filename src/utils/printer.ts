import * as rl from 'readline';

const print = (data: Printable) => {
    rl.clearLine(process.stdout, 0);
    rl.cursorTo(process.stdout, 0);
    process.stdout.write(data.toString());
};

export interface Printable { toString(): string; }
export type Printer = (data: Printable) => void;

export async function printProgressAsync<R>(f: (printer: Printer) => Promise<R>) {
    const res = await f(print);
    console.log(''); // tslint:disable-line no-console
    return res;
}
