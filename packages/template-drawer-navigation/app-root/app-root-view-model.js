const observableModule = require("data/observable");

function AppRootViewModel(selectedPage) {
    const viewModel = observableModule.fromObject({
        selectedPage: selectedPage
    });

    return viewModel;
}

module.exports = AppRootViewModel;
