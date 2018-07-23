if (global.TNS_WEBPACK) {
    // Register custom modules
    global.registerModule("nativescript-ui-sidedrawer",
        () => require("../node_modules/nativescript-ui-sidedrawer"));
}
