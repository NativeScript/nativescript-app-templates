const FeaturedViewModel = require("./featured-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new FeaturedViewModel();
}

exports.onLoaded = onLoaded;
