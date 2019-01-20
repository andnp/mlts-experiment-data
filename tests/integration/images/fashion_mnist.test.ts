import { files, time } from 'utilities-ts';
import { sum, getRow, asArray } from 'utils/utils';

import * as fashion_mnist from 'images/fashion_mnist';

jest.setTimeout(time.minutes(5));

test('Can download and load the datafile', async () => {
    const root = '.test';
    const filePath = `${root}/fashion_mnist.tar.gz`;
    const alreadyExists = await files.fileExists(filePath);

    if (alreadyExists) await files.removeRecursively(filePath);

    await fashion_mnist.download(root);

    const existsNow = await files.fileExists(filePath);
    expect(existsNow).toBe(true);

    const unzipped = await files.fileExists(`${root}/fashion_mnist`);
    expect(unzipped).toBe(true);

    const data = await fashion_mnist.load(root);

    expect(data.description()).toEqual({
        classes: 1,
        features: 784,
        samples: 60000,
        testSamples: 10000,
    });

    const [X, Y] = data.train;
    expect(sum(getRow(X, 0))).toBe(76247);
    expect(asArray(getRow(Y, 0))).toEqual([9]);

    const [T, TY] = data.test;

    expect(sum(getRow(T, 0))).toBe(33456);
    expect(asArray(getRow(TY, 0))).toEqual([9]);
});
