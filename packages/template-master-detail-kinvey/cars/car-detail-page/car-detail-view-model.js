const observableModule = require("data/observable");

/* ***********************************************************
* This is the item details view model.
*************************************************************/
function CarDetailViewModel(carModel) {
    const viewModel = observableModule.fromObject({
        car: carModel
    });

    return viewModel;
}

module.exports = CarDetailViewModel;
