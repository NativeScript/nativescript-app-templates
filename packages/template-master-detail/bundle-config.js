if (global.TNS_WEBPACK) {
    //registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    global.registerModule("nativescript-pro-ui/listview", () =>
        require("../node_modules/nativescript-pro-ui/listview"));

    // register application modules
    // This will register each `page` postfixed xml, css, js, ts, scss in the app/ folder
    const context = require.context("~/", true, /(page|fragment)\.(xml|css|js|ts|scss)$/);
    global.registerWebpackModules(context);
}
