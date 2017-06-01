var Observable = require("data/observable").Observable;

function CarDetailViewModel(carModel) {
    var viewModel = new Observable();

    viewModel.car = carModel;

    return viewModel;
}

module.exports = CarDetailViewModel;