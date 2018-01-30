if (global.TNS_WEBPACK) {
    // Register tns-core-modules UI framework modules
    require("bundle-entry-points");

    global.registerModule("nativescript-pro-ui/listview",
        () => require("../node_modules/nativescript-pro-ui/listview"));

    // Register application modules
    // This will register each `root`, `page`, `fragment` postfixed xml, css, js, ts, scss file in the app/ folder
    const context = require.context("~/", true, /(root|page|fragment)\.(xml|css|js|ts|scss)$/);
    global.registerWebpackModules(context);
}
