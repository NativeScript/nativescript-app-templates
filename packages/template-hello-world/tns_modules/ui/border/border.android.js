var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var borderCommon = require("ui/border/border-common");
var utils = require("utils/utils");
require("utils/module-merge").merge(borderCommon, exports);
function onBorderPropertyChanged(data) {
    var border = data.object;
    border._updateAndroidBorder();
}
borderCommon.Border.cornerRadiusProperty.metadata.onSetNativeValue = onBorderPropertyChanged;
borderCommon.Border.borderWidthProperty.metadata.onSetNativeValue = onBorderPropertyChanged;
borderCommon.Border.borderColorProperty.metadata.onSetNativeValue = onBorderPropertyChanged;
var Border = (function (_super) {
    __extends(Border, _super);
    function Border() {
        _super.apply(this, arguments);
    }
    Border.prototype._updateAndroidBorder = function () {
        if (!this._nativeView) {
            return;
        }
        var nativeView = this._nativeView;
        var backgroundDrawable = nativeView.getBackground();
        if (!(backgroundDrawable instanceof android.graphics.drawable.GradientDrawable)) {
            backgroundDrawable = new android.graphics.drawable.GradientDrawable();
            nativeView.setBackgroundDrawable(backgroundDrawable);
        }
        var gd = backgroundDrawable;
        var density = utils.layout.getDisplayDensity();
        gd.setCornerRadius(this.cornerRadius * density);
        if (this.borderColor) {
            gd.setStroke(this.borderWidth * density, this.borderColor.android);
        }
        else {
            gd.setStroke(this.borderWidth * density, android.graphics.Color.TRANSPARENT);
        }
        if (this.backgroundColor) {
            gd.setColor(this.backgroundColor.android);
        }
        else {
            gd.setColor(android.graphics.Color.TRANSPARENT);
        }
    };
    return Border;
})(borderCommon.Border);
exports.Border = Border;
