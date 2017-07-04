const Observable = require("data/observable").Observable;
const ObservableArray = require("data/observable-array").ObservableArray;
const firebase = require("nativescript-plugin-firebase");

const Car = require("./shared/car-model");

function CarsListViewModel() {
    const viewModel = new Observable();

    viewModel.isLoading = false;
    viewModel.cars = new ObservableArray([]);

    viewModel.load = function () {
        const path = "cars";

        this.set("isLoading", true);

        const onValueEvent = (snapshot) => {
            this._handleSnapshot(snapshot.value);
            this.set("isLoading", false);
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    };

    viewModel._handleSnapshot = function (data) {
        this._empty();

        if (data) {
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    const result = Object.assign({ id }, data[id]);
                    viewModel.cars.push(new Car(result));
                }
            }
        }
    };

    viewModel._empty = function () {
        while (this.cars.length) {
            this.cars.pop();
        }
    };

    return viewModel;
}

module.exports = CarsListViewModel;
