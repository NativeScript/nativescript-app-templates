import firebase = require("nativescript-plugin-firebase");
import { Observable } from "rxjs/Rx";

import { Car } from "./car-model";

const editableProperties = [
    "doors",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];

export class CarService {
    static getInstance(): CarService {
        return CarService._instance;
    }

    private static _instance: CarService = new CarService();

    private static cloneUpdateModel(car: Car): object {
        return editableProperties.reduce((a, e) => (a[e] = car[e], a), {}); // tslint:disable-line:ban-comma-operator
    }

    private _cars: Array<Car> = [];

    constructor() {
        if (CarService._instance) {
            throw new Error("Use CarService.getInstance() instead of new.");
        }

        CarService._instance = this;
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "cars";

            const onValueEvent = (snapshot: any) => {
                const results = this.handleSnapshot(snapshot.value);
                observer.next(results);
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).catch(this.handleErrors);
    }

    update(carModel: Car): Promise<any> {
        const updateModel = CarService.cloneUpdateModel(carModel);

        return firebase.update(`/cars/${carModel.id}`, updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        return firebase.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    }

    private handleSnapshot(data: any): Array<Car> {
        this._cars = [];

        if (data) {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._cars.push(new Car(data[id]));
                }
            }
        }

        return this._cars;
    }

    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
