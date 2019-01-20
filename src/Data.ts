import { tuple, product } from './utils/utils';
import { IdxTensor } from 'idx-data';

export interface DataTensor extends IdxTensor {}

export class Dataset {
    constructor(
        protected _x: DataTensor,
        protected _y: DataTensor,
        protected _t: DataTensor,
        protected _ty: DataTensor,
    ) {}

    get train() {
        return tuple(this._x, this._y);
    }

    get test() {
        return tuple(this._t, this._ty);
    }

    get features() {
        return product(this._x.shape.slice(1));
    }

    get trainSamples() {
        return this._x.shape[0];
    }

    get testSamples() {
        return this._t.shape[0];
    }

    get classes() {
        return product(this._y.shape.slice(1));
    }

    description() {
        return {
            samples: this.trainSamples,
            testSamples: this.testSamples,
            features: this.features,
            classes: this.classes,
        };
    }
}
