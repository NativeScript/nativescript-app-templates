var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var contentView = require("ui/content-view");
var view = require("ui/core/view");
var styleScope = require("ui/styling/style-scope");
var fs = require("file-system");
var fileSystemAccess = require("file-system/file-system-access");
var trace = require("trace");
var knownEvents;
(function (knownEvents) {
    knownEvents.navigatedTo = "navigatedTo";
})(knownEvents = exports.knownEvents || (exports.knownEvents = {}));
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(options) {
        _super.call(this, options);
        this._styleScope = new styleScope.StyleScope();
    }
    Page.prototype.onLoaded = function () {
        this._applyCss();
        _super.prototype.onLoaded.call(this);
    };
    Object.defineProperty(Page.prototype, "navigationContext", {
        get: function () {
            return this._navigationContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "css", {
        get: function () {
            if (this._styleScope) {
                return this._styleScope.css;
            }
            return undefined;
        },
        set: function (value) {
            this._styleScope.css = value;
            this._refreshCss();
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype._refreshCss = function () {
        if (this._cssApplied) {
            this._resetCssValues();
        }
        this._cssApplied = false;
        if (this.isLoaded) {
            this._applyCss();
        }
    };
    Page.prototype.addCss = function (cssString) {
        this._styleScope.addCss(cssString);
        this._refreshCss();
    };
    Page.prototype.addCssFile = function (cssFileName) {
        var cssString;
        var realCssFileName = fs.path.join(fs.knownFolders.currentApp().path, cssFileName);
        if (fs.File.exists(realCssFileName)) {
            new fileSystemAccess.FileSystemAccess().readText(realCssFileName, function (r) {
                cssString = r;
            });
            this.addCss(cssString);
        }
    };
    Object.defineProperty(Page.prototype, "frame", {
        get: function () {
            return this.parent;
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.onNavigatingTo = function (context) {
        this._navigationContext = context;
    };
    Page.prototype.onNavigatedTo = function (context) {
        this._navigationContext = context;
        this.notify({
            eventName: knownEvents.navigatedTo,
            object: this,
            context: context
        });
    };
    Page.prototype.onNavigatingFrom = function () {
    };
    Page.prototype.onNavigatedFrom = function (isBackNavigation) {
        this._navigationContext = undefined;
    };
    Page.prototype._getStyleScope = function () {
        return this._styleScope;
    };
    Page.prototype._applyCss = function () {
        if (this._cssApplied) {
            return;
        }
        try {
            this._styleScope.ensureSelectors();
            var scope = this._styleScope;
            var checkSelectors = function (view) {
                scope.applySelectors(view);
                return true;
            };
            checkSelectors(this);
            view.eachDescendant(this, checkSelectors);
            this._cssApplied = true;
        }
        catch (e) {
            trace.write("Css styling failed: " + e, trace.categories.Style);
        }
    };
    Page.prototype._resetCssValues = function () {
        var resetCssValuesFunc = function (view) {
            view.style._resetCssValues();
            return true;
        };
        resetCssValuesFunc(this);
        view.eachDescendant(this, resetCssValuesFunc);
    };
    return Page;
})(contentView.ContentView);
exports.Page = Page;
