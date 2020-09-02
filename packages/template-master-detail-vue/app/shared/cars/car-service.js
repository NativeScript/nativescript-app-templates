import { firebase, storage } from "@nativescript/firebase";

import Car from "./car-model";

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

function CarService() {
    if (CarService._instance) {
        throw new Error("Use CarService.getInstance() instead of new.");
    }

    this._cars = [];
    CarService._instance = this;

    this.load = function () {
        return new Promise((resolve, reject) => {
          firebase.addValueEventListener((snapshot) => {
                const data = snapshot.value;

                this._cars = [];

                if (data) {
                    for (const id in data) {
                        if (data.hasOwnProperty(id)) {
                            this._cars.push(new Car(data[id]));
                        }
                    }
                }

                resolve(data);
            }, `/cars`);
        });
    };

    this.update = function (carModel) {
        const updateModel = cloneUpdateModel(carModel);

        return firebase.update(`/cars/${carModel.id}`, updateModel);
    };

    this.uploadImage = function (remoteFullPath, localFullPath) {
        return storage.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    };

    this._handleErrors = function (error) {
        return Observable.throw(error);
    };
}

CarService._instance = new CarService();

function cloneUpdateModel(car) {
    return editableProperties.reduce((a, e) => (a[e] = car[e], a), {}); // eslint-disable-line no-return-assign, no-sequences
}

export default CarService._instance;
