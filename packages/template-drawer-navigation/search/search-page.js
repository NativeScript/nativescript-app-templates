const app = require("application");

const SearchViewModel = require("./search-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new SearchViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
