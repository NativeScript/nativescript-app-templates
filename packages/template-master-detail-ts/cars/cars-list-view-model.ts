import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

import { Config } from "../shared/config";
import { Car } from "./shared/car-model";
import { CarService } from "./shared/car-service";

/* ***********************************************************
* This is the master list view model.
*************************************************************/
export class CarsListViewModel extends Observable {
    private _isLoading: boolean = false;
    private _cars: ObservableArray<Car> = new ObservableArray<Car>([]);
    private _carService: CarService;

    constructor() {
        super();

        this._carService = CarService.getInstance();
    }

    get cars(): ObservableArray<Car> {
        return this._cars;
    }

    set cars(value: ObservableArray<Car>) {
        if (this._cars !== value) {
            this._cars = value;
            this.notifyPropertyChange("cars", value);
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange("isLoading", value);
        }
    }

    load(): void {
        this.isLoading = true;

        this._carService.load()
            .finally(() => this.isLoading = false)
            .subscribe((cars: Array<Car>) => {
                this.cars = new ObservableArray(cars);
                this.isLoading = false;
            });
    }
}
