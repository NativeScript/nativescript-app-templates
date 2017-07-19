import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import firebase = require("nativescript-plugin-firebase");

import { Config } from "../../shared/config";
import { Car } from "./car.model";

/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
@Injectable()
export class CarService {
    private _cars: Array<Car> = [];

    constructor(private _ngZone: NgZone) { }

    getCarById(id: string) {
        if (!id) {
            return;
        }

        return this._cars.filter((car) => {
            return car.id === id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "cars";

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).catch(this.handleErrors);
    }

    update(editModel: any) {
        return firebase.update("/cars/" + editModel.id, editModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string) {
        return firebase.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    }

    private handleSnapshot(data: any) {
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

    private handleErrors(error: Response) {
        return Observable.throw(error);
    }
}
