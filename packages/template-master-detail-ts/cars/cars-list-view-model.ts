import { Car } from "./shared/car-model";
import { Config } from "../shared/config";
import { Observable } from 'data/observable';
import { ObservableArray } from 'data/observable-array';

export class CarsListViewModel extends Observable {
    private _isLoading: boolean;
    private _cars: ObservableArray<Car>;

    constructor() {
        super();

        // Initialize default values.
        this._cars = new ObservableArray<Car>([]);
        this._isLoading = false;
    }

    get cars(): ObservableArray<Car> {
        return this._cars;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value)
        }
    }

    load(): void {
        this.isLoading = true;

        fetch(Config.apiUrl + "Cars")
            .then(this.handleErrors)
            .then((response: any) => {
                return response.json();
            }).then((data) => {
                data.Result.forEach((carJson) => {
                    this._cars.push(new Car(carJson));
                });

                this.isLoading = false;
            });
    }

    empty(): void {
        while (this._cars.length) {
            this._cars.pop();
        }
    }

    private handleErrors(response): void {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}