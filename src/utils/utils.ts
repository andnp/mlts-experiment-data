import { DataTensor } from 'Data';
import { BufferType } from 'idx-data/dist/src/utils';

export function tuple<T1, T2>(t1: T1, t2: T2): [T1, T2] {
    return [t1, t2];
}

interface Reducable {
    reduce: (f: (coll: number, d: number) => number, init: number) => number;
}

export function sum<T extends Reducable>(arr: T): number {
    return arr.reduce((x, y) => x + y, 0);
}

export function product<T extends Reducable>(arr: T): number {
    return arr.reduce((x, y) => x * y, 1);
}

export function getRow(tensor: DataTensor, row: number) {
    const cols = product(tensor.shape.slice(1));
    const start = row * cols;
    return tensor.data.slice(start, start + cols);
}


export function asArray(arr: BufferType): number[] {
    const out = [] as number[];
    for (let i = 0; i < arr.length; ++i) out.push(arr[i]);
    return out;
}

export function splitTensor(tensor: DataTensor, splitPoint: number): [DataTensor, DataTensor] {
    const cols = product(tensor.shape.slice(1));

    const firstData = tensor.data.slice(0, splitPoint * cols);
    const secondData = tensor.data.slice(splitPoint * cols, tensor.data.length);

    const first: DataTensor = {
        data: firstData,
        type: tensor.type,
        shape: [
            splitPoint,
            ...tensor.shape.slice(1),
        ],
    };

    const second: DataTensor = {
        data: secondData,
        type: tensor.type,
        shape: [
            tensor.shape[0] - splitPoint,
            ...tensor.shape.slice(1),
        ],
    };

    return tuple(first, second);
}
