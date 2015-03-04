var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/text-view/text-view-common");
require("utils/module-merge").merge(common, exports);
var TextView = (function (_super) {
    __extends(TextView, _super);
    function TextView() {
        _super.apply(this, arguments);
    }
    TextView.prototype._createUI = function () {
        _super.prototype._createUI.call(this);
        this.android.setGravity(android.view.Gravity.TOP | android.view.Gravity.LEFT);
        this.android.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_FLAG_MULTI_LINE);
    };
    return TextView;
})(common.TextView);
exports.TextView = TextView;
