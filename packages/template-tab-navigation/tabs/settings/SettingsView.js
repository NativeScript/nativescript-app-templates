var SettingsViewModel = require("./settings-view-model");

function onLoaded(args) {
    var component = args.object;
    component.bindingContext = new SettingsViewModel();
}

exports.onLoaded = onLoaded;