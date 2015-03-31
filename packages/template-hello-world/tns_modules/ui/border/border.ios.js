var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var borderCommon = require("ui/border/border-common");
var color = require("color");
require("utils/module-merge").merge(borderCommon, exports);
function onCornerRadiusPropertyChanged(data) {
    var view = data.object;
    if (!view._nativeView) {
        return;
    }
    if (view._nativeView instanceof UIView) {
        view._nativeView.layer.cornerRadius = data.newValue;
    }
}
borderCommon.Border.cornerRadiusProperty.metadata.onSetNativeValue = onCornerRadiusPropertyChanged;
function onBorderWidthPropertyChanged(data) {
    var view = data.object;
    if (!view._nativeView) {
        return;
    }
    if (view._nativeView instanceof UIView) {
        view._nativeView.layer.borderWidth = data.newValue;
    }
}
borderCommon.Border.borderWidthProperty.metadata.onSetNativeValue = onBorderWidthPropertyChanged;
function onBorderColorPropertyChanged(data) {
    var view = data.object;
    if (!view._nativeView) {
        return;
    }
    if (view._nativeView instanceof UIView && data.newValue instanceof color.Color) {
        view._nativeView.layer.borderColor = data.newValue.ios.CGColor;
    }
}
borderCommon.Border.borderColorProperty.metadata.onSetNativeValue = onBorderColorPropertyChanged;
var Border = (function (_super) {
    __extends(Border, _super);
    function Border() {
        _super.apply(this, arguments);
    }
    return Border;
})(borderCommon.Border);
exports.Border = Border;
