
const app = require("application");

const SettingsViewModel = require("./settings-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new SettingsViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
