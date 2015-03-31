var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/tool-bar/tool-bar-common");
require("utils/module-merge").merge(common, exports);
function onItemsPropertyChanged(data) {
    var view = data.object;
    if (!view.android) {
        return;
    }
}
common.ToolBar.itemsProperty.metadata.onSetNativeValue = onItemsPropertyChanged;
var ToolBar = (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        _super.apply(this, arguments);
    }
    ToolBar.prototype._createUI = function () {
        this._android = new android.widget.Toolbar(this._context);
    };
    Object.defineProperty(ToolBar.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return ToolBar;
})(common.ToolBar);
exports.ToolBar = ToolBar;
