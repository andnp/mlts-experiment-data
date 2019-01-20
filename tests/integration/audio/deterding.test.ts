import { files, time } from 'utilities-ts';
import { sum, getRow, asArray } from 'utils/utils';

import * as deterding from 'audio/deterding';

jest.setTimeout(time.minutes(5));

test('Can download and load the datafile', async () => {
    const root = '.test';
    const filePath = `${root}/deterding.tar.gz`;
    const alreadyExists = await files.fileExists(filePath);

    if (alreadyExists) await files.removeRecursively(filePath);

    await deterding.download(root);

    const existsNow = await files.fileExists(filePath);
    expect(existsNow).toBe(true);

    const unzipped = await files.fileExists(`${root}/deterding`);
    expect(unzipped).toBe(true);

    const data = await deterding.load(root);

    const [X, Y] = data.train;
    const [T, TY] = data.test;

    expect(data.description()).toEqual({
        classes: 11,
        features: 10,
        samples: 528,
        testSamples: 462,
    });

    expect(sum(getRow(X, 0))).toBeCloseTo(4.498563699424267);
    expect(asArray(getRow(Y, 0))).toEqual([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ]);


    expect(sum(getRow(T, 0))).toBeCloseTo(4.64417852461338);
    expect(asArray(getRow(TY, 0))).toEqual([ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ]);
});
