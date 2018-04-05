const observableModule = require("data/observable");

function SearchViewModel() {
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = SearchViewModel;
