const observableModule = require("data/observable");

function SettingsViewModel() {
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = SettingsViewModel;
