const app = require("tns-core-modules/application");

const HomeViewModel = require("./home-view-model");

function onNavigatingTo({ object: page }) {
    page.bindingContext = new HomeViewModel();
}

function onDrawerButtonTap() {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
