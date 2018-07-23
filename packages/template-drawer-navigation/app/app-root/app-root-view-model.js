const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function AppRootViewModel() {
    const viewModel = observableModule.fromObject({
        selectedPage: ""
    });

    SelectedPageService.getInstance().selectedPage$
    .subscribe((selectedPage) => { viewModel.selectedPage = selectedPage; });

    return viewModel;
}

module.exports = AppRootViewModel;
