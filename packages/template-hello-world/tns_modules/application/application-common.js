require("globals");
var definition = require("application");
var fs = require("file-system");
var fileSystemAccess = require("file-system/file-system-access");
var styleScope = require("ui/styling/style-scope");
exports.cssFile = "app.css";
exports.resources = {};
exports.onUncaughtError = undefined;
exports.onLaunch = undefined;
exports.onSuspend = undefined;
exports.onResume = undefined;
exports.onExit = undefined;
exports.onLowMemory = undefined;
exports.android = undefined;
exports.ios = undefined;
function loadCss() {
    if (definition.cssFile) {
        var cssFileName = fs.path.join(fs.knownFolders.currentApp().path, definition.cssFile);
        var applicationCss;
        if (fs.File.exists(cssFileName)) {
            new fileSystemAccess.FileSystemAccess().readText(cssFileName, function (r) {
                applicationCss = r;
            });
            definition.cssSelectorsCache = styleScope.StyleScope.createSelectorsFromCss(applicationCss, cssFileName);
        }
    }
}
exports.loadCss = loadCss;
