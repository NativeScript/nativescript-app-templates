var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var color = require("color");
var knownEvents;
(function (knownEvents) {
    knownEvents.submit = "submit";
    knownEvents.clear = "clear";
})(knownEvents = exports.knownEvents || (exports.knownEvents = {}));
var SearchBar = (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SearchBar.prototype, "text", {
        get: function () {
            return this._getValue(SearchBar.textProperty);
        },
        set: function (value) {
            this._setValue(SearchBar.textProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBar.prototype, "hint", {
        get: function () {
            return this._getValue(SearchBar.hintProperty);
        },
        set: function (value) {
            this._setValue(SearchBar.hintProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBar.prototype, "textFieldBackgroundColor", {
        get: function () {
            return this._getValue(SearchBar.textFieldBackgroundColorProperty);
        },
        set: function (value) {
            this._setValue(SearchBar.textFieldBackgroundColorProperty, value instanceof color.Color ? value : new color.Color(value));
        },
        enumerable: true,
        configurable: true
    });
    SearchBar.textFieldBackgroundColorProperty = new dependencyObservable.Property("textFieldBackgroundColor", "SearchBar", new proxy.PropertyMetadata(undefined));
    SearchBar.hintProperty = new dependencyObservable.Property("hint", "SearchBar", new proxy.PropertyMetadata(""));
    SearchBar.textProperty = new dependencyObservable.Property("text", "SearchBar", new proxy.PropertyMetadata("", dependencyObservable.PropertyMetadataSettings.AffectsLayout));
    return SearchBar;
})(view.View);
exports.SearchBar = SearchBar;
