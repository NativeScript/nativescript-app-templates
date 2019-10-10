const app = require("tns-core-modules/application");

const SearchViewModel = require("./search-view-model");

function onNavigatingTo({ object: page }) {
    page.bindingContext = new SearchViewModel();
}

function onDrawerButtonTap() {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
