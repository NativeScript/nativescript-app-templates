if (global.TNS_WEBPACK) {
    //registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    //register application modules
    global.registerModule("nativescript-telerik-ui/sidedrawer", function () { return require("../node_modules/nativescript-telerik-ui/sidedrawer"); });

    global.registerModule("shared/my-drawer/MyDrawer", function () { return require("./shared/my-drawer/MyDrawer"); });
    global.registerModule("home/home-page", function () { return require("./home/home-page"); });
    global.registerModule("browse/browse-page", function () { return require("./browse/browse-page"); });
    global.registerModule("featured/featured-page", function () { return require("./featured/featured-page"); });
    global.registerModule("search/search-page", function () { return require("./search/search-page"); });
    global.registerModule("settings/settings-page", function () { return require("./settings/settings-page"); });
}
