var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
exports.valueProperty = new dependencyObservable.Property("value", "Slider", new proxy.PropertyMetadata(0));
exports.minValueProperty = new dependencyObservable.Property("minValue", "Slider", new proxy.PropertyMetadata(0));
exports.maxValueProperty = new dependencyObservable.Property("maxValue", "Slider", new proxy.PropertyMetadata(100));
var Slider = (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        _super.call(this);
    }
    Object.defineProperty(Slider.prototype, "value", {
        get: function () {
            return this._getValue(exports.valueProperty);
        },
        set: function (value) {
            var newValue = value;
            newValue = Math.max(newValue, this.minValue);
            newValue = Math.min(newValue, this.maxValue);
            this._setValue(exports.valueProperty, newValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "minValue", {
        get: function () {
            return this._getValue(exports.minValueProperty);
        },
        set: function (newValue) {
            this._setValue(exports.minValueProperty, newValue);
            if (newValue > this.maxValue) {
                this._setValue(exports.maxValueProperty, newValue);
            }
            if (newValue > this.value) {
                this._setValue(exports.valueProperty, newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "maxValue", {
        get: function () {
            return this._getValue(exports.maxValueProperty);
        },
        set: function (newValue) {
            this._setValue(exports.maxValueProperty, newValue);
            if (newValue < this.minValue) {
                this._setValue(exports.minValueProperty, newValue);
            }
            if (newValue < this.value) {
                this._setValue(exports.valueProperty, newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Slider;
})(view.View);
exports.Slider = Slider;
