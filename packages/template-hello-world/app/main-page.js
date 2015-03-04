var vmModule = require("./main-view-model");

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;