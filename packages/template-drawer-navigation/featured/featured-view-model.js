const observableModule = require("data/observable");

function FeaturedViewModel() {
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = FeaturedViewModel;
