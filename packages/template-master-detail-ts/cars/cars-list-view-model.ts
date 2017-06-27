import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");

import { Config } from "../shared/config";
import { Car } from "./shared/car-model";

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
            this.notifyPropertyChange("isLoading", value);
        }
    }

    load(): void {
        const path = "cars";

        this.isLoading = true;

        const onValueEvent = (snapshot: any) => {
            this.handleSnapshot(snapshot.value);

            this.isLoading = false;
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }

    private handleSnapshot(data: any) {
        this.empty();

        if (data) {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    const result = Object.assign({ id }, ...data[id]);
                    this._cars.push(new Car(result));
                }
            }
        }
    }

    private empty(): void {
        while (this._cars.length) {
            this._cars.pop();
        }
    }
}
