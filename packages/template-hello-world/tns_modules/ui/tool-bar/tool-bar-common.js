var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var proxy = require("ui/core/proxy");
var dependencyObservable = require("ui/core/dependency-observable");
var knownCollections;
(function (knownCollections) {
    knownCollections.items = "items";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
var ToolBar = (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        _super.apply(this, arguments);
    }
    ToolBar.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "items") {
            this._setValue(ToolBar.itemsProperty, value);
        }
    };
    Object.defineProperty(ToolBar.prototype, "items", {
        get: function () {
            return this._getValue(ToolBar.itemsProperty);
        },
        set: function (value) {
            this._setValue(ToolBar.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ToolBar.itemsProperty = new dependencyObservable.Property("items", "ToolBar", new proxy.PropertyMetadata(undefined));
    return ToolBar;
})(view.View);
exports.ToolBar = ToolBar;
