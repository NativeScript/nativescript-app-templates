const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const fs = require("tns-core-modules/file-system");

const Config = require("../../shared/config");
const Car = require("./car-model");

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

function CarService() {
    if (CarService._instance) {
        throw new Error("Use CarService.getInstance() instead of new.");
    }

    this._cars = [];
    this._carsStore = Kinvey.DataStore.collection("cars");

    CarService._instance = this;

    this.load = function () {
        return this._login().then(() => this._carsStore.sync()).then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("name");
            const stream = this._carsStore.find(sortByNameQuery);

            return stream.toPromise();
        }).then((data) => {
            this._allCars = [];
            data.forEach((carData) => {
                carData.id = carData._id;
                const car = new Car(carData);

                this._allCars.push(car);
            });

            return this._allCars;
        });
    };

    this.update = function (carModel) {
        const updateModel = cloneUpdateModel(carModel);

        return this._carsStore.save(updateModel);
    };

    this.uploadImage = function (remoteFullPath, localFullPath) {
        const imageFile = fs.File.fromPath(localFullPath);
        const imageContent = imageFile.readSync();

        const metadata = {
            filename: imageFile.name,
            mimeType: this._getMimeType(imageFile.extension),
            size: imageContent.length,
            public: true
        };

        return Kinvey.Files.upload(imageFile, metadata, { timeout: 2147483647 })
            .then((uploadedFile) => {
                const query = new Kinvey.Query();
                query.equalTo("_id", uploadedFile._id);

                return Kinvey.Files.find(query);
            })
            .then((files) => {
                if (files && files.length) {
                    const file = files[0];
                    file.url = file._downloadURL;

                    return file;
                }
                else {
                    Promise.reject(new Error("No items with the given ID could be found."));
                }
            });
    };

    this._login = function () {
        if (Kinvey.User.getActiveUser()) {
            return Promise.resolve();
        }
        else {
            return Kinvey.User.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    };

    this._getMimeType = function (imageExtension) {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return `image/${extension.replace(/\./g, "")}`;
    };
}

CarService.getInstance = function () {
    return CarService._instance;
};

CarService._instance = new CarService();

function cloneUpdateModel(car) {
    return editableProperties.reduce((a, e) => (a[e] = car[e], a), { _id: car.id }); // eslint-disable-line no-return-assign, no-sequences
}

module.exports = CarService;
