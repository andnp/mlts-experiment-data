// -----
// Utils
// -----
export * from './utils/downloader';

// ------
// Images
// ------
import * as _fashion_mnist from './images/fashion_mnist';
import * as _gray_cifar10 from './images/gray_cifar10';
import * as _mnist from './images/mnist';

export const FashionMnist = _fashion_mnist;
export const GrayCifar10 = _gray_cifar10;
export const Mnist = _mnist;

// -----
// Audio
// -----
import * as _deterding from './audio/deterding';

export const Deterding = _deterding;
