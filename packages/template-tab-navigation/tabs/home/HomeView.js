var HomeViewModel = require("./home-view-model");

function onLoaded(args) {
    var component = args.object;
    component.bindingContext = new HomeViewModel();
}

exports.onLoaded = onLoaded;