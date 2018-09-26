import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

import { Config } from "../shared/config";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Car } from "./shared/car-model";
import { CarService } from "./shared/car-service";

export class CarsListViewModel extends Observable {
    @ObservableProperty() cars: ObservableArray<Car>;
    @ObservableProperty() isLoading: boolean;

    private _carService: CarService;
    private _dataSubscription: Subscription;

    constructor() {
        super();

        this.cars = new ObservableArray<Car>([]);
        this.isLoading = false;

        this._carService = CarService.getInstance();
    }

    load(): void {
        if (!this._dataSubscription) {
            this.isLoading = true;

            this._dataSubscription = this._carService.load()
                .pipe(finalize(() => {
                    this.isLoading = false;
                }))
                .subscribe((cars: Array<Car>) => {
                    this.cars = new ObservableArray(cars);
                    this.isLoading = false;
                });
        }
    }

    unload(): void {
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    }
}
