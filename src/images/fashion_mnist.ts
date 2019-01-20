import * as path from 'path';

import * as downloader from '../utils/downloader';
import { Data } from '..//Data';
import * as idx from 'idx-data';

const dataRemoteLocation = 'https://rawgit.com/andnp/ml_data/master/fashion_mnist.tar.gz';

export function download(location = '.tmp') {
    return downloader.download(dataRemoteLocation, location);
}

export async function load(location = '.tmp') {
    await download(location);

    const root = path.join(location, 'fashion_mnist');

    const [
        dataX,
        dataY,
        dataT,
        dataTY,
    ] = await Promise.all([
        idx.loadBits(path.join(root, 'train-images-idx3-ubyte')),
        idx.loadBits(path.join(root, 'train-labels-idx1-ubyte')),
        idx.loadBits(path.join(root, 't10k-images-idx3-ubyte')),
        idx.loadBits(path.join(root, 't10k-labels-idx1-ubyte')),
    ]);

    return new Data(
        dataX,
        dataY,
        dataT,
        dataTY,
    );
}
