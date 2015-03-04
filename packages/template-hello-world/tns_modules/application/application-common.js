require("globals");
var definition = require("application");
var cssParser = require("js-libs/reworkcss");
var fs = require("file-system");
var fileSystemAccess = require("file-system/file-system-access");
var styleScope = require("ui/styling/style-scope");
exports.cssFile = "app/app.css";
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
            var applicationCssSyntaxTree = cssParser.parse(applicationCss, undefined);
            definition.cssSelectorsCache = styleScope.StyleScope.createSelectorsFromSyntaxTree(applicationCssSyntaxTree);
        }
    }
}
exports.loadCss = loadCss;
