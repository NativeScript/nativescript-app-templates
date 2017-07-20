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

        load: function () {
            this.set("isLoading", true);

            this._carService.load()
                .finally(() => this.set("isLoading", false))
                .subscribe((cars) => {
                    this.set("cars", new ObservableArray(cars));
                    this.set("isLoading", false);
                });
        }
    });

    return viewModel;
}

module.exports = CarsListViewModel;
