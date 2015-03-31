var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var pageCommon = require("ui/page/page-common");
var trace = require("trace");
require("utils/module-merge").merge(pageCommon, exports);
var UIViewControllerImpl = (function (_super) {
    __extends(UIViewControllerImpl, _super);
    function UIViewControllerImpl() {
        _super.apply(this, arguments);
    }
    UIViewControllerImpl.new = function () {
        return _super.new.call(this);
    };
    UIViewControllerImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        this.automaticallyAdjustsScrollViewInsets = false;
        return this;
    };
    UIViewControllerImpl.prototype.viewDidLoad = function () {
        this.view.autoresizesSubviews = false;
        this.view.autoresizingMask = UIViewAutoresizing.UIViewAutoresizingNone;
    };
    UIViewControllerImpl.prototype.viewDidLayoutSubviews = function () {
        trace.write(this._owner + " viewDidLayoutSubviews, isLoaded = " + this._owner.isLoaded, trace.categories.ViewHierarchy);
        this._owner._updateLayout();
    };
    return UIViewControllerImpl;
})(UIViewController);
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(options) {
        _super.call(this, options);
        this._ios = UIViewControllerImpl.new().initWithOwner(this);
    }
    Page.prototype._onContentChanged = function (oldView, newView) {
        _super.prototype._onContentChanged.call(this, oldView, newView);
        this._removeNativeView(oldView);
        this._addNativeView(newView);
    };
    Page.prototype._addNativeView = function (view) {
        if (view) {
            trace.write("Native: Adding " + view + " to " + this, trace.categories.ViewHierarchy);
            if (view.ios instanceof UIView) {
                this._ios.view.addSubview(view.ios);
            }
            else if (view.ios instanceof UIViewController) {
                this._ios.addChildViewController(view.ios);
                this._ios.view.addSubview(view.ios.view);
            }
        }
    };
    Page.prototype._removeNativeView = function (view) {
        if (view) {
            trace.write("Native: Removing " + view + " from " + this, trace.categories.ViewHierarchy);
            if (view.ios instanceof UIView) {
                view.ios.removeFromSuperview();
            }
            else if (view.ios instanceof UIViewController) {
                view.ios.removeFromParentViewController();
                view.ios.view.removeFromSuperview();
            }
        }
    };
    Object.defineProperty(Page.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "_nativeView", {
        get: function () {
            return this.ios.view;
        },
        enumerable: true,
        configurable: true
    });
    return Page;
})(pageCommon.Page);
exports.Page = Page;
