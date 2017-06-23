var BrowseViewModel = require("./browse-view-model");

function onLoaded(args) {
    var component = args.object;
    component.bindingContext = new BrowseViewModel();
}

exports.onLoaded = onLoaded;