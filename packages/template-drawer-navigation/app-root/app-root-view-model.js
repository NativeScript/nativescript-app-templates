const observableModule = require("data/observable");

/* ***********************************************************
 * Keep data that is displayed in your app root.
 *************************************************************/
function AppRootViewModel(selectedPage) {
    const viewModel = observableModule.fromObject({
        /* ***********************************************************
         * Use the app root view model to initialize the properties data values.
         *************************************************************/
        selectedPage: selectedPage
    });

    return viewModel;
}

module.exports = AppRootViewModel;
