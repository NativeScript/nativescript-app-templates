const observableModule = require("data/observable");

function CarDetailViewModel(carModel) {
    const viewModel = observableModule.fromObject({
        car: carModel
    });

    return viewModel;
}

module.exports = CarDetailViewModel;
