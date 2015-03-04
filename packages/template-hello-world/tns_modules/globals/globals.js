var types = require("utils/types");
var timer = require("timer");
var consoleModule = require("console");
var http = require("http");
var dialogs = require("ui/dialogs");
global.setTimeout = timer.setTimeout;
global.clearTimeout = timer.clearTimeout;
global.setInterval = timer.setInterval;
global.clearInterval = timer.clearInterval;
if (types.isUndefined(global.NSObject)) {
    global.console = new consoleModule.Console();
}
global.XMLHttpRequest = http.XMLHttpRequest;
global.alert = dialogs.alert;
