var frameModule = require("ui/frame");

var model = {
    navigationItems: [
        {
            title: "Home",
            route: "home/home-page"
        },
        {
            title: "Browse",
            route: "browse/browse-page"
        },
        {
            title: "Search",
            route: "search/search-page"
        },
        {
            title: "Featured",
            route: "featured/featured-page"
        },
        {
            title: "Settings",
            route: "settings/settings-page"
        }
    ]
};

function onLoaded(args) {
    var layout = args.object;

    layout.bindingContext = model;
}

function onNavigationItemTap(args) {
    var route = args.view.bindingContext.route;
    frameModule.topmost().navigate({
        moduleName: route,
        transition: {
            name: "slide"
        }
    });
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;