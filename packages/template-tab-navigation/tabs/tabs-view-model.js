const observableModule = require("data/observable");
const platform = require("platform");

function TabsViewModel() {
    const viewModel = observableModule.fromObject({
        title: ""
    });

    return viewModel;
}

module.exports = TabsViewModel;
