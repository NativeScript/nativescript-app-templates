import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { Kinvey } from "kinvey-nativescript-sdk";
import { Config } from "../../shared/config";
import { Car } from "./car.model";

import * as fs from "file-system";

const editableProperties = [
    "class",
    "doors",
    "hasAC",
    "transmission",
    "luggage",
    "name",
    "price",
    "seats",
    "imageUrl"
];

@Injectable()
export class CarService {
    private static cloneUpdateModel(car: Car): object {
        return editableProperties.reduce((a, e) => (a[e] = car[e], a), { _id: car.id });
    }

    private allCars: Array<Car> = [];
    private carsStore = Kinvey.DataStore.collection<any>("cars");

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
                return this.carsStore.sync();
            }).then(() => {
                const sortByNameQuery = new Kinvey.Query();
                sortByNameQuery.ascending("name");
                const stream = this.carsStore.find(sortByNameQuery);

                return stream.toPromise();
            }).then((data) => {
                this.allCars = [];
                data.forEach((carData: any) => {
                    carData.id = carData._id;
                    const car = new Car(carData);

                    this.allCars.push(car);
                });

                observer.next(this.allCars);
            }).catch(this.handleErrors);
        });
    }

    update(carModel: Car): Promise<any> {
        const updateModel = CarService.cloneUpdateModel(carModel);

        return this.carsStore.save(updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        const imageFile = fs.File.fromPath(localFullPath);
        const imageContent = imageFile.readSync();

        const metadata = {
            filename: imageFile.name,
            mimeType: this.getMimeType(imageFile.extension),
            size: imageContent.length,
            public: true
        };

        return Kinvey.Files.upload(imageFile, metadata, { timeout: 2147483647 })
            .then((uploadedFile: any) => {
                const query = new Kinvey.Query();
                query.equalTo("_id", uploadedFile._id);

                return Kinvey.Files.find(query);
            })
            .then((files: Array<any>) => {
                if (files && files.length) {
                    const file = files[0];
                    file.url = file._downloadURL;

                    return file;
                } else {
                    Promise.reject(new Error("No items with the given ID could be found."));
                }
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

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return "image/" + extension.replace(/\./g, "");
    }
}
