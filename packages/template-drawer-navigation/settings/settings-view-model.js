const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function SettingsViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Settings");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = SettingsViewModel;
