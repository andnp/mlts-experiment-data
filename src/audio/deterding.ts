import * as path from 'path';

import * as downloader from '../utils/downloader';
import { Dataset } from '../Data';
import * as idx from 'idx-data';

const dataRemoteLocation = 'https://rawgit.com/andnp/ml_data/master/deterding.tar.gz';

export function download(location = '.tmp') {
    return downloader.download(dataRemoteLocation, location);
}

export async function load(location = '.tmp') {
    await download(location);

    const root = path.join(location, 'deterding');

    const [
        dataX,
        dataY,
        dataT,
        dataTY,
    ] = await Promise.all([
        idx.loadBits(path.join(root, 'deterding_data.idx')),
        idx.loadBits(path.join(root, 'deterding_labels.idx')),
        idx.loadBits(path.join(root, 'deterding_test-data.idx')),
        idx.loadBits(path.join(root, 'deterding_test-labels.idx')),
    ]);

    return new Dataset(
        dataX,
        dataY,
        dataT,
        dataTY,
    );
}
