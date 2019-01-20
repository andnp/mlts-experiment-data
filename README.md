# mlts-experiment-data

[![Greenkeeper badge](https://badges.greenkeeper.io/andnp/mlts-experiment-data.svg)](https://greenkeeper.io/)

Easily download and import common machine learning datasets including MNIST, gray-scale CIFAR10, and FashionMNIST.
Seemlessly integrates with `@tensorflow/tfjs` tensors making it easy to quickly validate models on commonly used datasets.

**[Images](#images)**

[FashionMNIST](#fashionmnist) - [Gray-Scale CIFAR-10](#grey-scale-cifar-10) - [MNIST](#mnist)

**[Audio](#audio)**

[Deterding](#deterding)

## API
Each dataset has a common api:

### download
Downloads the data to the specified folder, recursively building the folder path if necessary.
This method **does not** import or load the data, only downloads the data if necessary.
If the data has already been downloaded, this method will not re-download.

```typescript
import { FashionMnist } from 'mlts-experiment-data';

await FashionMnist.download('path/to/download/location');
```

### load
Downloads the data (if necessary) and loads it into an appropriate typed array.
Returns a `Dataset` object.

```typescript
import { Mnist } from 'mlts-experiment-data';

const mnist = await Mnist.load('path/to/download/location');\

const [ X, Y ] = mnist.train;

console.log(X); // =>
/*
{
    data: <Uint8Array>,
    shape: [60000, 28, 28],
    type: 'uint8',
}
*/
```

## Types
Some of the types that will be returned:

### Dataset
```typescript
// get a dataset object
const data = await Mnist.load();

// access the training tensors
// [ featureTensor, targetTensor ]
const [ X, Y ] = data.train;

// access the testing set tensors
const [ X_test, Y_test ] = data.test;

// get the number of features
// in the case of a multidimensional tensor of rank > 2,
// this is the product of each feature shape.
// For instance MNIST has shape [60000, 28, 28]
// therefore 28 * 28 = 784 features
const features: number = data.features;

// get the number of classes
const classes: number = data.classes;

// get number of samples in the training set
const samples: number = data.samples;

// get number of samples in the testing set
const testSamples: number = data.testSamples;
```

### DataTensor
```typescript
// get a dataset object
const data = await Mnist.load();

// get two DataTensor objects
const [ X, Y ] = data.train;

// get the raw data
// this will be a flat TypedArray
const data: Uint8Array | Float32Array | Int32Array = X.data;

// get the shape of the tensor
const shape: number[] = X.shape

// get the type of the tensor
// this is redundant with the type of the TypedArray
const type: 'float32' | 'uint8' | 'int32' = X.type;
```

## @tensorflow/tfjs
```typescript
import * as tf from '@tensoflow/tfjs';
import { Mnist } from 'mlts-experiment-data';

const data = await Mnist.load();
const [ X, Y ] = data.train;

const X_tensor = tf.tensor(X.data, X.shape);

const backAgain = await X_tensor.data().then(raw => ({ shape: X_tensor.shape, data: raw }));
```

## Datasets

### Images
#### MNIST
```typescript
import { Mnist } from 'mlts-experiment-data';

const mnist = await Mnist.load();
```

```
@article{lecun1998gradient,
  title={Gradient-based learning applied to document recognition},
  author={LeCun, Yann and Bottou, L{\'e}on and Bengio, Yoshua and Haffner, Patrick},
  journal={Proceedings of the IEEE},
  volume={86},
  number={11},
  pages={2278--2324},
  year={1998},
  publisher={IEEE}
}
```

#### FashionMNIST
```typescript
import { FashionMnist } from 'mlts-experiment-data';

const fashion = await FashionMnist.load();
```

```
@online{xiao2017/online,
  author       = {Han Xiao and Kashif Rasul and Roland Vollgraf},
  title        = {Fashion-MNIST: a Novel Image Dataset for Benchmarking Machine Learning Algorithms},
  date         = {2017-08-28},
  year         = {2017},
  eprintclass  = {cs.LG},
  eprinttype   = {arXiv},
  eprint       = {cs.LG/1708.07747},
}
```

#### Grey-Scale CIFAR-10
```typescript
import { GrayCifar10 } from 'mlts-experiment-data';

const gray_cifar = await GrayCifar10.load();
```

```
@techreport{krizhevsky2009learning,
  title={Learning multiple layers of features from tiny images},
  author={Krizhevsky, Alex and Hinton, Geoffrey},
  year={2009},
  institution={Citeseer}
}
```

### Audio
#### Deterding
```typescript
import { Deterding } from 'mlts-experiment-data';

const vowels = await Deterding.load();
```

```
@misc{Dua:2017 ,
author = "Dheeru, Dua and Karra Taniskidou, Efi",
year = "2017",
title = "{UCI} Machine Learning Repository",
url = "http://archive.ics.uci.edu/ml",
institution = "University of California, Irvine, School of Information and Computer Sciences" }
```
