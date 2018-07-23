const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const finalize = require("rxjs/operators").finalize;

const CarService = require("./shared/car-service");

function CarsListViewModel() {
    const viewModel = observableModule.fromObject({
        cars: new ObservableArray([]),
        isLoading: false,

        _carService: CarService.getInstance(),
        _dataSubscription: null,

        load: function () {
            if (!this._dataSubscription) {
                this.set("isLoading", true);

                this._dataSubscription = this._carService.load()
                    .pipe(finalize(() => this.set("isLoading", false)))
                    .subscribe((cars) => {
                        this.set("cars", new ObservableArray(cars));
                        this.set("isLoading", false);
                    });
            }
        },

        unload: function () {
            if (this._dataSubscription) {
                this._dataSubscription.unsubscribe();
                this._dataSubscription = null;
            }
        }
    });

    return viewModel;
}

module.exports = CarsListViewModel;
