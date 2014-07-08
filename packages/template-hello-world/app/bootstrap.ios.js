var appModule = require("application");
var main = require("/main");

// This Logic will merge with the android bootstrap when the application module from TNS evolves.
appModule.init(null);
appModule.onLaunch = function() {
    return new main.MainViewController();
};