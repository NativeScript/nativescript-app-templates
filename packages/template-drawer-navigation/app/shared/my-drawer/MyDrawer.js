var frameModule = require("ui/frame");

var model = {
    items: [
        {
            title: "Home",
            handler: function () {
                var topmost = frameModule.topmost();
                topmost.navigate("home/home-page");
            }
        },
        {
            title: "Browse",
            handler: function () {
                var topmost = frameModule.topmost();
                topmost.navigate("browse/browse-page");
            }
        },
        {
            title: "Search",
            handler: function () {
                var topmost = frameModule.topmost();
                topmost.navigate("search/search-page");
            }
        },
        {
            title: "Featured",
            handler: function () {
                var topmost = frameModule.topmost();
                topmost.navigate("featured/featured-page");
            }
        },
        {
            title: "Settings",
            handler: function () {
                var topmost = frameModule.topmost();
                topmost.navigate("settings/settings-page");
            }
        }
    ]
};

function onLoaded(args) {
    var layout = args.object;

    layout.bindingContext = model;
}

exports.onLoaded = onLoaded;