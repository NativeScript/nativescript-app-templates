var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var knownEvents;
(function (knownEvents) {
    knownEvents.submit = "submit";
    knownEvents.clear = "clear";
})(knownEvents = exports.knownEvents || (exports.knownEvents = {}));
exports.textProperty = new dependencyObservable.Property("text", "SearchBar", new proxy.PropertyMetadata("", dependencyObservable.PropertyMetadataSettings.AffectsLayout));
var SearchBar = (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SearchBar.prototype, "text", {
        get: function () {
            return this._getValue(exports.textProperty);
        },
        set: function (value) {
            this._setValue(exports.textProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    return SearchBar;
})(view.View);
exports.SearchBar = SearchBar;
