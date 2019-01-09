const observableModule = require("tns-core-modules/data/observable");

function CarDetailViewModel(carModel) {
    const viewModel = observableModule.fromObject({
        car: carModel
    });

    return viewModel;
}

module.exports = CarDetailViewModel;
