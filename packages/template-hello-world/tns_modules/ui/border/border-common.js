var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var color = require("color");
var proxy = require("ui/core/proxy");
var contentView = require("ui/content-view");
var dependencyObservable = require("ui/core/dependency-observable");
var types = require("utils/types");
var viewModule = require("ui/core/view");
var utils = require("utils/utils");
var cornerRadiusProperty = new dependencyObservable.Property("cornerRadius", "Border", new proxy.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.AffectsStyle));
var borderWidthProperty = new dependencyObservable.Property("borderWidth", "Border", new proxy.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.AffectsStyle));
var borderColorProperty = new dependencyObservable.Property("borderColor", "Border", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle));
var Border = (function (_super) {
    __extends(Border, _super);
    function Border() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Border.prototype, "cornerRadius", {
        get: function () {
            return this._getValue(Border.cornerRadiusProperty);
        },
        set: function (value) {
            this._setValue(Border.cornerRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Border.prototype, "borderWidth", {
        get: function () {
            return this._getValue(Border.borderWidthProperty);
        },
        set: function (value) {
            this._setValue(Border.borderWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Border.prototype, "borderColor", {
        get: function () {
            return this._getValue(Border.borderColorProperty);
        },
        set: function (value) {
            if (types.isString(value) || types.isNumber(value)) {
                this._setValue(Border.borderColorProperty, new color.Color(value));
            }
            else {
                this._setValue(Border.borderColorProperty, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Border.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var density = utils.layout.getDisplayDensity();
        var borderSize = (2 * this.borderWidth) * density;
        var result = viewModule.View.measureChild(this, this.content, utils.layout.makeMeasureSpec(width - borderSize, widthMode), utils.layout.makeMeasureSpec(height - borderSize, heightMode));
        var widthAndState = viewModule.View.resolveSizeAndState(result.measuredWidth + borderSize, width, widthMode, 0);
        var heightAndState = viewModule.View.resolveSizeAndState(result.measuredHeight + borderSize, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    Border.prototype.onLayout = function (left, top, right, bottom) {
        var density = utils.layout.getDisplayDensity();
        var borderSize = this.borderWidth * density;
        viewModule.View.layoutChild(this, this.content, borderSize, borderSize, right - left - borderSize, bottom - top - borderSize);
    };
    Border.prototype._updateAndroidBorder = function () {
    };
    Border.cornerRadiusProperty = cornerRadiusProperty;
    Border.borderWidthProperty = borderWidthProperty;
    Border.borderColorProperty = borderColorProperty;
    return Border;
})(contentView.ContentView);
exports.Border = Border;
