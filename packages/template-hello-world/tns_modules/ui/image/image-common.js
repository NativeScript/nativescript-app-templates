var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dependencyObservable = require("ui/core/dependency-observable");
var view = require("ui/core/view");
var proxy = require("ui/core/proxy");
var imageSource = require("image-source");
var trace = require("trace");
var enums = require("ui/enums");
var utils = require("utils/utils");
var SOURCE = "source";
var URL = "url";
var IMAGE = "Image";
var ISLOADING = "isLoading";
var STRETCH = "stretch";
function isValidUrl(url) {
    var value = url ? url.trim() : "";
    return value !== "" && (value.indexOf("~/") === 0 || value.indexOf("http://") === 0 || value.indexOf("https://") === 0);
}
function onUrlPropertyChanged(data) {
    var image = data.object;
    var value = data.newValue;
    if (isValidUrl(value)) {
        image.source = null;
        image["_url"] = value;
        if (value !== "") {
            image._setValue(exports.isLoadingProperty, true);
            if (value.trim().indexOf("~/") === 0) {
                image.source = imageSource.fromFile(value.trim());
                image._setValue(exports.isLoadingProperty, false);
            }
            else {
                imageSource.fromUrl(value).then(function (r) {
                    if (image["_url"] === value) {
                        image.source = r;
                        image._setValue(exports.isLoadingProperty, false);
                    }
                });
            }
        }
    }
}
exports.urlProperty = new dependencyObservable.Property(URL, IMAGE, new proxy.PropertyMetadata("", dependencyObservable.PropertyMetadataSettings.None, onUrlPropertyChanged));
exports.sourceProperty = new dependencyObservable.Property(SOURCE, IMAGE, new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));
exports.isLoadingProperty = new dependencyObservable.Property(ISLOADING, IMAGE, new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));
exports.stretchProperty = new dependencyObservable.Property(STRETCH, IMAGE, new proxy.PropertyMetadata(enums.Stretch.aspectFit, dependencyObservable.PropertyMetadataSettings.AffectsLayout));
var Image = (function (_super) {
    __extends(Image, _super);
    function Image(options) {
        _super.call(this, options);
    }
    Object.defineProperty(Image.prototype, "source", {
        get: function () {
            return this._getValue(exports.sourceProperty);
        },
        set: function (value) {
            this._setValue(exports.sourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "url", {
        get: function () {
            return this._getValue(exports.urlProperty);
        },
        set: function (value) {
            this._setValue(exports.urlProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "isLoading", {
        get: function () {
            return this._getValue(exports.isLoadingProperty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "stretch", {
        get: function () {
            return this._getValue(exports.stretchProperty);
        },
        set: function (value) {
            this._setValue(exports.stretchProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        trace.write(this + " :onMeasure: " + utils.layout.getMode(widthMode) + " " + width + ", " + utils.layout.getMode(heightMode) + " " + height, trace.categories.Layout);
        var nativeWidth = this.source ? this.source.width : 0;
        var nativeHeight = this.source ? this.source.height : 0;
        var measureWidth = Math.max(nativeWidth, this.minWidth);
        var measureHeight = Math.max(nativeHeight, this.minHeight);
        var finiteWidth = widthMode !== utils.layout.UNSPECIFIED;
        var finiteHeight = heightMode !== utils.layout.UNSPECIFIED;
        if (nativeWidth !== 0 && nativeHeight !== 0 && (finiteWidth || finiteHeight)) {
            var scale = Image.computeScaleFactor(width, height, finiteWidth, finiteHeight, nativeWidth, nativeHeight, this.stretch);
            var resultW = nativeWidth * scale.width;
            var resultH = nativeHeight * scale.height;
            measureWidth = finiteWidth ? Math.min(resultW, width) : resultW;
            measureHeight = finiteHeight ? Math.min(resultH, height) : resultH;
            trace.write("Image stretch: " + this.stretch + ", nativeWidth: " + nativeWidth + ", nativeHeight: " + nativeHeight, trace.categories.Layout);
        }
        var widthAndState = view.View.resolveSizeAndState(measureWidth, width, widthMode, 0);
        var heightAndState = view.View.resolveSizeAndState(measureHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    Image.computeScaleFactor = function (measureWidth, measureHeight, widthIsFinite, heightIsFinite, nativeWidth, nativeHeight, imageStretch) {
        var scaleW = 1;
        var scaleH = 1;
        if ((imageStretch === enums.Stretch.aspectFill || imageStretch === enums.Stretch.aspectFit || imageStretch === enums.Stretch.fill) && (widthIsFinite || heightIsFinite)) {
            scaleW = (nativeWidth > 0) ? measureWidth / nativeWidth : 0;
            scaleH = (nativeHeight > 0) ? measureHeight / nativeHeight : 0;
            if (!widthIsFinite) {
                scaleW = scaleH;
            }
            else if (!heightIsFinite) {
                scaleH = scaleW;
            }
            else {
                switch (imageStretch) {
                    case enums.Stretch.aspectFit:
                        scaleH = scaleW < scaleH ? scaleW : scaleH;
                        scaleW = scaleH;
                        break;
                    case enums.Stretch.aspectFill:
                        scaleH = scaleW > scaleH ? scaleW : scaleH;
                        scaleW = scaleH;
                        break;
                }
            }
        }
        return { width: scaleW, height: scaleH };
    };
    return Image;
})(view.View);
exports.Image = Image;
