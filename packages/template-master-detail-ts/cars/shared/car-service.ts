import { Observable } from "rxjs/Rx";
import firebase = require("nativescript-plugin-firebase");

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
        return editableProperties.reduce((a, e) => (a[e] = car[e], a), {});
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
                    const result = Object.assign({ id }, ...data[id]);
                    this._cars.push(new Car(result));
                }
            }
        }

        return this._cars;
    }

    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
