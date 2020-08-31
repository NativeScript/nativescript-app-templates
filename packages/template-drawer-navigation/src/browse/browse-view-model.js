const core = require("@nativescript/core");

const SelectedPageService = require("../shared/selected-page-service");

function BrowseViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

    const viewModel = core.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = BrowseViewModel;
