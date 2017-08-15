import { Observable } from "rxjs/Rx";
import { Config } from "../../shared/config";
import { Car } from "./car-model";

import * as fs from "file-system";
import { Kinvey } from "kinvey-nativescript-sdk";

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

export class CarService {
    static getInstance(): CarService {
        return CarService._instance;
    }

    private static _instance: CarService = new CarService();

    private static cloneUpdateModel(car: Car): object {
        return editableProperties.reduce((a, e) => (a[e] = car[e], a), { _id: car.id });
    }

    private allCars: Array<Car> = [];
    private carsStore = Kinvey.DataStore.collection<any>("cars");

    constructor() {
        if (CarService._instance) {
            throw new Error("Use CarService.getInstance() instead of new.");
        }

        CarService._instance = this;
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

    private syncDataStore(): Promise<any> {
        return this.carsStore.pendingSyncEntities()
            .then((pendingEntities: Array<any>) => {
                let queue = Promise.resolve();

                if (pendingEntities && pendingEntities.length) {
                    queue = queue
                        .then(() => this.carsStore.push())
                        .then((entities: Array<Kinvey.PushResult<Car>>) => {

                            /* ***********************************************************
                            * Each item in the array of pushed entities will look like the following
                            * { _id: '<entity id before push>', entity: <entity after push> }
                            * It could also possibly have an error property if the push failed.
                            * { _id: '<entity id before push>', entity: <entity after push>,
                            * error: <reason push failed> }
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
        return Observable.throw(error);
    }

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return "image/" + extension.replace(/\./g, "");
    }
}
