var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/tool-bar/tool-bar-common");
var view = require("ui/core/view");
require("utils/module-merge").merge(common, exports);
function onItemsPropertyChanged(data) {
    var bar = data.object;
    if (!bar.ios) {
        return;
    }
    var items = new NSMutableArray();
    for (var element in data.newValue) {
        if (element.view instanceof view.View) {
            bar._addView(element.view);
            items.addObject(element.view.ios);
        }
    }
    bar.ios.setItemsAnimated(items, false);
}
common.ToolBar.itemsProperty.metadata.onSetNativeValue = onItemsPropertyChanged;
var ToolBar = (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        _super.call(this);
        this._ios = UIToolbar.new();
    }
    Object.defineProperty(ToolBar.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return ToolBar;
})(common.ToolBar);
exports.ToolBar = ToolBar;
