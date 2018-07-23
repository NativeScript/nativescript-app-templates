if (global.TNS_WEBPACK) {
    // Register nativescript-ui-listview module
    global.registerModule("nativescript-ui-listview", () =>
        require("../node_modules/nativescript-ui-listview"));
}
