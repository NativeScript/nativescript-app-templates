const app = require("tns-core-modules/application");

const BrowseViewModel = require("./browse-view-model");

function onNavigatingTo({ object: page }) {
    page.bindingContext = new BrowseViewModel();
}

function onDrawerButtonTap() {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
