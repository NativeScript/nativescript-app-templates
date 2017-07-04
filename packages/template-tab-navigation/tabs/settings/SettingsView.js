const SettingsViewModel = require("./settings-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new SettingsViewModel();
}

exports.onLoaded = onLoaded;
