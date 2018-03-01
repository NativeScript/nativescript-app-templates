if (global.TNS_WEBPACK) {
    // Register tns-core-modules UI framework modules
    require("bundle-entry-points");

    global.registerModule("nativescript-ui-listview", () =>
        require("../node_modules/nativescript-ui-listview"));

    // Register application modules
    // This will register each `root`, `page`, `fragment` postfixed xml, css, js, ts, scss file in the app/ folder
    const context = require.context("~/", true, /(root|page|fragment)\.(xml|css|js|ts|scss)$/);
    global.registerWebpackModules(context);
}
