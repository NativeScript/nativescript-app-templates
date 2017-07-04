const Observable = require("data/observable").Observable;

function CarDetailViewModel(carModel) {
    const viewModel = new Observable();

    viewModel.car = carModel;

    return viewModel;
}

module.exports = CarDetailViewModel;
