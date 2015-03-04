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
var SegmentedBar = (function (_super) {
    __extends(SegmentedBar, _super);
    function SegmentedBar() {
        _super.apply(this, arguments);
    }
    SegmentedBar.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "items") {
            this.items = value;
        }
    };
    Object.defineProperty(SegmentedBar.prototype, "selectedIndex", {
        get: function () {
            return this._getValue(SegmentedBar.selectedIndexProperty);
        },
        set: function (value) {
            this._setValue(SegmentedBar.selectedIndexProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentedBar.prototype, "items", {
        get: function () {
            return this._getValue(SegmentedBar.itemsProperty);
        },
        set: function (value) {
            this._setValue(SegmentedBar.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    SegmentedBar.selectedIndexProperty = new dependencyObservable.Property("selectedIndex", "SegmentedBar", new proxy.PropertyMetadata(0));
    SegmentedBar.itemsProperty = new dependencyObservable.Property("items", "SegmentedBar", new proxy.PropertyMetadata(undefined));
    return SegmentedBar;
})(view.View);
exports.SegmentedBar = SegmentedBar;
