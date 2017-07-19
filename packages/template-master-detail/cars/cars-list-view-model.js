const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const firebase = require("nativescript-plugin-firebase");

const Car = require("./shared/car-model");

/* ***********************************************************
* This is the master list view model.
*************************************************************/
function CarsListViewModel() {
    const viewModel = observableModule.fromObject({
        cars: new ObservableArray([]),
        isLoading: false,

        load: function () {
            const path = "cars";

            this.set("isLoading", true);

            const onValueEvent = (snapshot) => {
                this._handleSnapshot(snapshot.value);
                this.set("isLoading", false);
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        },

        _empty: function () {
            while (this.cars.length) {
                this.cars.pop();
            }
        },

        _handleSnapshot: function (data) {
            this._empty();

            if (data) {
                for (const id in data) {
                    if (data.hasOwnProperty(id)) {
                        const result = Object.assign({ id }, data[id]);
                        viewModel.cars.push(new Car(result));
                    }
                }
            }
        }
    });

    return viewModel;
}

module.exports = CarsListViewModel;
