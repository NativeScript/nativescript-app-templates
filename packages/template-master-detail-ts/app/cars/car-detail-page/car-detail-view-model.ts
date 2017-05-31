import { Car } from "../shared/car-model";
import { Observable } from 'data/observable';

export class CarDetailViewModel extends Observable {
    private _car: Car;

    constructor(car: Car) {
        super();

        this._car = car;
    }

    get car(): Car {
        return this._car;
    }
}