import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject, Observable } from "rxjs/Rx";

import { Kinvey } from "kinvey-nativescript-sdk";
import { Config } from "../../shared/config";
import { Car } from "./car.model";

import * as fs from "file-system";

var imageSource = require("image-source");
@Injectable()
export class CarService {
    private allCars: Array<Car> = [];
    private carsStore = Kinvey.DataStore.collection<any>("cars");

    constructor(private _ngZone: NgZone) { }

    getCarById(id: string): Car {
        if (!id) {
            return;
        }

        return this.allCars.filter((car) => {
            return car.id === id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {

            this.login().then(() => {
                return this.syncDataStore();
            }).then(() => {
                const stream = this.carsStore.find();

                return stream.toPromise();
            }).then((data) => {
                this.allCars = [];
                data.forEach((carData: any) => {
                    const car = new Car(carData);
                    car.id = carData._id;

                    this.allCars.push(car);
                });

                observer.next(this.allCars);
            }).catch(this.handleErrors);
        });
    }

    update(editModel: Car): Promise<any> {
        const updateModel = <any>editModel;
        updateModel._id = editModel.id;

        return this.carsStore.save(updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        // TODO: Rework upload of image after kinvey-navitescript-sdk is fixed.

        let imageFile = fs.File.fromPath(localFullPath);
        let binarySource = imageFile.readSync(err => { console.log("Error raeding binary:" + err); });

        const metadata = {
            filename: 'image.jpg',
            mimeType: 'image/jpeg',
            public: true
        };

        return Kinvey.Files.upload(imageFile, metadata);
    }

    private syncDataStore(): Promise<any> {
        return this.carsStore.pendingSyncEntities().then((pendingEntities: any[]) => {
            let queue = Promise.resolve();

            if (pendingEntities && pendingEntities.length) {
                queue = queue
                    .then(() => this.carsStore.push())
                    .then((entities: Kinvey.PushResult<Car>[]) => {

                        /* ***********************************************************
                        * Each item in the array of pushed entities will look like the following
                        * { _id: '<entity id before push>', entity: <entity after push> }
                        * It could also possibly have an error property if the push failed.
                        * { _id: '<entity id before push>', entity: <entity after push>, error: <reason push failed> }
                        * Learn more about in this documentation article:
                        * http://devcenter.kinvey.com/nativescript/guides/datastore#push
                        *************************************************************/
                    });
            }

            return queue;
        });
    }

    private login(): Promise<any> {
        if (!!Kinvey.User.getActiveUser()) {
            return Promise.resolve();
        } else {
            return Kinvey.User.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }

    private handleErrors(error: Response) {
        console.log(error);

        return Observable.throw(error);
    }
}
