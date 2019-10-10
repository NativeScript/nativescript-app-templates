const app = require("tns-core-modules/application");

const FeaturedViewModel = require("./featured-view-model");

function onNavigatingTo({ object: page }) {
    page.bindingContext = new FeaturedViewModel();
}

function onDrawerButtonTap() {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
