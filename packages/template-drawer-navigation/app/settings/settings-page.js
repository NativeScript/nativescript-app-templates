
const app = require("tns-core-modules/application");

const SettingsViewModel = require("./settings-view-model");

function onNavigatingTo({ object: page }) {
    page.bindingContext = new SettingsViewModel();
}

function onDrawerButtonTap() {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
