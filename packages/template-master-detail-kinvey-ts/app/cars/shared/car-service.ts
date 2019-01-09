import { Config } from "../../shared/config";
import { Car } from "./car-model";

import { Kinvey } from "kinvey-nativescript-sdk";
import { File } from "tns-core-modules/file-system";

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
        // tslint:disable-next-line:ban-comma-operator
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

    load(): Promise<any> {
        return this.login().then(() => {
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

            return this.allCars;
        });
    }

    update(carModel: Car): Promise<any> {
        const updateModel = CarService.cloneUpdateModel(carModel);

        return this.carsStore.save(updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        const imageFile = File.fromPath(localFullPath);
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

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return "image/" + extension.replace(/\./g, "");
    }
}
