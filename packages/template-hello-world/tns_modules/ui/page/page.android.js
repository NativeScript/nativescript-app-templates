var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var pageCommon = require("ui/page/page-common");
var trace = require("trace");
require("utils/module-merge").merge(pageCommon, exports);
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(options) {
        _super.call(this, options);
        this._isBackNavigation = false;
    }
    Page.prototype._onDetached = function (force) {
        var skipDetached = !force && this.frame.android.cachePagesOnNavigate && !this._isBackNavigation;
        if (skipDetached) {
            trace.write("Caching Page " + this._domId, trace.categories.NativeLifecycle);
        }
        else {
            _super.prototype._onDetached.call(this);
        }
    };
    Page.prototype.onNavigatedFrom = function (isBackNavigation) {
        this._isBackNavigation = isBackNavigation;
        _super.prototype.onNavigatedFrom.call(this, isBackNavigation);
    };
    return Page;
})(pageCommon.Page);
exports.Page = Page;
