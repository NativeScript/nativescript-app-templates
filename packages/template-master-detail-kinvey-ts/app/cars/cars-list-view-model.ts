import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { Config } from "../shared/config";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Car } from "./shared/car-model";
import { CarService } from "./shared/car-service";

/* ***********************************************************
* This is the master list view model.
*************************************************************/
export class CarsListViewModel extends Observable {
    @ObservableProperty() cars: ObservableArray<Car> = new ObservableArray<Car>([]);
    @ObservableProperty() isLoading: boolean = false;

    private _carService: CarService;

    constructor() {
        super();

        this._carService = CarService.getInstance();
    }

    load(): void {
        this.isLoading = true;

        this._carService.load()
            .then((cars: Array<Car>) => {
                this.cars = new ObservableArray(cars);
                this.isLoading = false;
            })
            .catch(() => {
                this.isLoading = false;
            });
    }
}
