const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

const CarService = require("./shared/car-service");

/* ***********************************************************
 * This is the master list view model.
 *************************************************************/
function CarsListViewModel() {
    const viewModel = observableModule.fromObject({
        cars: new ObservableArray([]),
        isLoading: false,

        _carService: CarService.getInstance(),
        _dataSubscription: null,

        load: function () {
            this.set("isLoading", true);

            if (!this._dataSubscription) {
                this._dataSubscription = this._carService.load()
                    .finally(() => this.set("isLoading", false))
                    .subscribe((cars) => {
                        this.set("cars", new ObservableArray(cars));
                        this.set("isLoading", false);
                    });
            }
        },

        unload: function() {
            if (this._dataSubscription) {
                this._dataSubscription.unsubscribe();
                this._dataSubscription = null;
            }
        }
    });

    return viewModel;
}

module.exports = CarsListViewModel;
