const HomeViewModel = require("./home-view-model");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
* Call any view model data initialization load here.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    page.actionBarHidden = true;
    page.bindingContext = new HomeViewModel(page.navigationContext);
}

exports.onNavigatingTo = onNavigatingTo;
