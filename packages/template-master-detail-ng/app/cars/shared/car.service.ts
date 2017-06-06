import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import firebase = require("nativescript-plugin-firebase");

import { Config } from "../../shared/config";
import { Car } from "./car.model";

@Injectable()
export class CarService {
    private _cars: Car[];

    constructor(private _ngZone: NgZone) {
        this._cars = [];
    }

    public getCarById(id: string) {
        if (!id) {
            return;
        }

        return this._cars.filter((car) => {
            return car.id == id;
        })[0];
    }

    public load(): Observable<any> {
        return new Observable((observer: any) => {
            let path = 'cars';

            let onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    let results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).catch(this.handleErrors);
    }

    public update(editObject: any) {
        var self = this;

        return firebase.update("/cars/" + editObject.id, editObject)
            .then(function () {
                // HACK: update local instance explicitly as value event is raised too late 
                // for first navigation to detail view to take the server change into account 
                // TODO: better alternatives?
                let car = self.getCarById(editObject.id);
                (<any>Object).assign(car, editObject);
            })
            .catch(function (errorMessage: any) {
                console.log(errorMessage);
                throw errorMessage;
            });
    }

    public uploadImage(remoteFullPath: string, localFullPath: string) {
        return firebase.uploadFile({
            remoteFullPath: remoteFullPath,
            localFullPath: localFullPath,
            onProgress: function (status) {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).catch(function (errorMessage: any) {
            console.log(errorMessage);
            throw errorMessage;
        });
    }

    private handleSnapshot(data: any) {
        this._cars = [];

        if (data) {
            for (let id in data) {
                let result = (<any>Object).assign({ id: id }, data[id]);
                this._cars.push(new Car(result));
            }
        }

        return this._cars;
    }

    private handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}