const core = require("@nativescript/core");

const SelectedPageService = require("../shared/selected-page-service");

function AppRootViewModel() {
    const viewModel = core.fromObject({
        selectedPage: ""
    });

    SelectedPageService.getInstance().selectedPage$
    .subscribe((selectedPage) => { viewModel.selectedPage = selectedPage; });

    return viewModel;
}

module.exports = AppRootViewModel;
