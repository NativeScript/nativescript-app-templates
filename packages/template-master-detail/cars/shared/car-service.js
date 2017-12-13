const Observable = require("rxjs/Observable").Observable;
const firebase = require("nativescript-plugin-firebase");

const Car = require("./car-model");

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
        return new Observable((observer) => {
            const path = "cars";
            const onValueEvent = (snapshot) => {
                const results = this._handleSnapshot(snapshot.value);
                observer.next(results);
            };

            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).catch(this._handleErrors);
    };

    this.update = function (carModel) {
        const updateModel = cloneUpdateModel(carModel);

        return firebase.update(`/cars/${carModel.id}`, updateModel);
    };

    this.uploadImage = function (remoteFullPath, localFullPath) {
        return firebase.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    };

    this._handleSnapshot = function (data) {
        this._cars = [];

        if (data) {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._cars.push(new Car(data[id]));
                }
            }
        }

        return this._cars;
    };

    this._handleErrors = function (error) {
        return Observable.throw(error);
    };
}

CarService.getInstance = function () {
    return CarService._instance;
};

CarService._instance = new CarService();

function cloneUpdateModel(car) {
    return editableProperties.reduce((a, e) => (a[e] = car[e], a), {}); // eslint-disable-line no-return-assign, no-sequences
}

module.exports = CarService;
