var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
exports.valueProperty = new dependencyObservable.Property("value", "Progress", new proxy.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.AffectsLayout));
exports.maxValueProperty = new dependencyObservable.Property("maxValue", "Progress", new proxy.PropertyMetadata(100, dependencyObservable.PropertyMetadataSettings.AffectsLayout));
var Progress = (function (_super) {
    __extends(Progress, _super);
    function Progress() {
        _super.call(this);
        this.maxValue = 100;
        this.value = 0;
    }
    Object.defineProperty(Progress.prototype, "maxValue", {
        get: function () {
            return this._getValue(exports.maxValueProperty);
        },
        set: function (newMaxValue) {
            this._setValue(exports.maxValueProperty, newMaxValue);
            if (this.value > newMaxValue) {
                this.value = newMaxValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Progress.prototype, "value", {
        get: function () {
            return this._getValue(exports.valueProperty);
        },
        set: function (value) {
            value = Math.min(value, this.maxValue);
            this._setValue(exports.valueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    return Progress;
})(view.View);
exports.Progress = Progress;
