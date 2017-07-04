const Observable = require("data/observable").Observable;

function Car(options) {
    const viewModel = new Observable();

    viewModel.id = options.id;
    viewModel.name = options.name;
    viewModel.hasAC = options.ac;
    viewModel.description = options.description;
    viewModel.seats = options.seats;
    viewModel.luggage = Number(options.luggage);
    viewModel.class = options.class;
    viewModel.doors = Number(options.doors);
    viewModel.price = Number(options.price);
    viewModel.transmission = options.transmission;
    viewModel.imageUrl = options.imageUrl;
    viewModel.imageStoragePath = options.imageStoragePath;

    return viewModel;
}

module.exports = Car;
