import * as path from 'path';

import * as downloader from '../utils/downloader';
import { Data } from '../Data';
import * as idx from 'idx-data';
import { splitTensor } from '../utils/utils';

const dataRemoteLocation = 'https://rawgit.com/andnp/ml_data/master/gs_cifar10.tar.gz';

export function download(location = '.tmp') {
    return downloader.download(dataRemoteLocation, location);
}

export async function load(location = '.tmp') {
    await download(location);

    const root = path.join(location, 'cifar');

    const [
        dataX,
        dataY,
    ] = await Promise.all([
        idx.loadBits(path.join(root, 'cifar_data.idx')),
        idx.loadBits(path.join(root, 'cifar_labels.idx')),
    ]);

    const [x, t] = splitTensor(dataX, 50000);
    const [y, ty] = splitTensor(dataY, 50000);

    return new Data(
        x,
        y,
        t,
        ty,
    );
}
