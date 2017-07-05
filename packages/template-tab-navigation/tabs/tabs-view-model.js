const Observable = require("data/observable").Observable;

function TabsViewModel() {
    const viewModel = new Observable();

    viewModel.title = "";

    return viewModel;
}

module.exports = TabsViewModel;
