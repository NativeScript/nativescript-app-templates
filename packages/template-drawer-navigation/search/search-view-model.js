const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function SearchViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Search");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = SearchViewModel;
