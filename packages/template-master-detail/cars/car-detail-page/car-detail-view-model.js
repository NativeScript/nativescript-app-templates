const Observable = require("data/observable").Observable;

/* ***********************************************************
* This is the item details view model.
*************************************************************/
function CarDetailViewModel(carModel) {
    const viewModel = new Observable();

    viewModel.car = carModel;

    return viewModel;
}

module.exports = CarDetailViewModel;
