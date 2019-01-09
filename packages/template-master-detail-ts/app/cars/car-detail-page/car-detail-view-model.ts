import { Observable } from "tns-core-modules/data/observable";

import { Car } from "../shared/car-model";

export class CarDetailViewModel extends Observable {
    constructor(private _car: Car) {
        super();
    }

    get car(): Car {
        return this._car;
    }
}
