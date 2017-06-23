var FeaturedViewModel = require("./featured-view-model");

function onLoaded(args) {
    var component = args.object;
    component.bindingContext = new FeaturedViewModel();
}

exports.onLoaded = onLoaded;