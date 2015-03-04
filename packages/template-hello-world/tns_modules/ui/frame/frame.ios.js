var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var frameCommon = require("ui/frame/frame-common");
var trace = require("trace");
require("utils/module-merge").merge(frameCommon, exports);
var ENTRY = "_entry";
var navDepth = 0;
var Frame = (function (_super) {
    __extends(Frame, _super);
    function Frame() {
        _super.call(this);
        this._ios = new iOSFrame(this);
    }
    Frame.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this._paramToNavigate) {
            this.navigate(this._paramToNavigate);
            this._paramToNavigate = undefined;
        }
    };
    Frame.prototype.navigate = function (param) {
        if (this.isLoaded) {
            _super.prototype.navigate.call(this, param);
        }
        else {
            this._paramToNavigate = param;
        }
    };
    Frame.prototype._navigateCore = function (backstackEntry) {
        var viewController = backstackEntry.resolvedPage.ios;
        if (!viewController) {
            throw new Error("Required page does have an viewController created.");
        }
        var animated = false;
        if (this.currentPage) {
            animated = this._getIsAnimatedNavigation(backstackEntry.entry);
        }
        if (this.backStack.length > 0) {
            this._ios.showNavigationBar = true;
        }
        viewController[ENTRY] = backstackEntry;
        navDepth++;
        trace.write("Frame<" + this._domId + ">.pushViewControllerAnimated depth = " + navDepth, trace.categories.Navigation);
        this._ios.controller.pushViewControllerAnimated(viewController, animated);
    };
    Frame.prototype._goBackCore = function (entry) {
        navDepth--;
        trace.write("Frame<" + this._domId + ">.popViewControllerAnimated depth = " + navDepth, trace.categories.Navigation);
        this._ios.controller.allowPop = true;
        this._ios.controller.popViewControllerAnimated(this._getIsAnimatedNavigation(entry));
        this._ios.controller.allowPop = false;
        if (this.backStack.length === 0) {
            this._ios.showNavigationBar = false;
        }
    };
    Object.defineProperty(Frame.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Frame.prototype, "_nativeView", {
        get: function () {
            return this._ios.controller.view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Frame, "defaultAnimatedNavigation", {
        get: function () {
            return frameCommon.Frame.defaultAnimatedNavigation;
        },
        set: function (value) {
            frameCommon.Frame.defaultAnimatedNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Frame.prototype.requestLayout = function () {
        _super.prototype.requestLayout.call(this);
        var window = this._nativeView.window;
        if (window) {
            window.setNeedsLayout();
        }
    };
    Frame.prototype.layoutNativeView = function (left, top, right, bottom) {
        var frame = CGRectMake(left, top, right - left, bottom - top);
        var nativeView;
        if (!this.parent && this._nativeView.subviews.count > 0) {
            nativeView = this._nativeView.subviews[0];
        }
        else {
            nativeView = this._nativeView;
        }
        if (!CGRectEqualToRect(nativeView.frame, frame)) {
            trace.write(this + ", Native setFrame: " + NSStringFromCGRect(frame), trace.categories.Layout);
            nativeView.frame = frame;
        }
    };
    Object.defineProperty(Frame.prototype, "navigationBarHeight", {
        get: function () {
            var navigationBar = this._ios.controller.navigationBar;
            return (navigationBar && !this._ios.controller.navigationBarHidden) ? navigationBar.frame.size.height : 0;
        },
        enumerable: true,
        configurable: true
    });
    return Frame;
})(frameCommon.Frame);
exports.Frame = Frame;
var UINavigationControllerImpl = (function (_super) {
    __extends(UINavigationControllerImpl, _super);
    function UINavigationControllerImpl() {
        _super.apply(this, arguments);
    }
    UINavigationControllerImpl.new = function () {
        return _super.new.call(this);
    };
    UINavigationControllerImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    Object.defineProperty(UINavigationControllerImpl.prototype, "allowPop", {
        get: function () {
            return this._allowPop;
        },
        set: function (value) {
            this._allowPop = value;
        },
        enumerable: true,
        configurable: true
    });
    UINavigationControllerImpl.prototype.viewDidLoad = function () {
        this.view.autoresizesSubviews = false;
        this.view.autoresizingMask = UIViewAutoresizing.UIViewAutoresizingNone;
        this._owner.onLoaded();
    };
    UINavigationControllerImpl.prototype.viewDidLayoutSubviews = function () {
        trace.write(this._owner + " viewDidLayoutSubviews, isLoaded = " + this._owner.isLoaded, trace.categories.ViewHierarchy);
        this._owner._updateLayout();
    };
    UINavigationControllerImpl.prototype.popViewControllerAnimated = function (animated) {
        if (this.allowPop) {
            return _super.prototype.popViewControllerAnimated.call(this, animated);
        }
        else {
            var currentControler = this._owner.currentPage.ios;
            this._owner.goBack();
            return currentControler;
        }
    };
    UINavigationControllerImpl.prototype.navigationControllerWillShowViewControllerAnimated = function (navigationController, viewController, animated) {
        var frame = this._owner;
        var page = frame.currentPage;
        if (page) {
            frame._removeView(page);
        }
        var newEntry = viewController[ENTRY];
        var newPage = newEntry.resolvedPage;
        frame._currentEntry = newEntry;
        frame._addView(newPage);
        newPage.onNavigatedTo(newEntry.entry.context);
    };
    UINavigationControllerImpl.prototype.navigationControllerDidShowViewControllerAnimated = function (navigationController, viewController, animated) {
        var frame = this._owner;
        var newEntry = viewController[ENTRY];
        var newPage = newEntry.resolvedPage;
        frame._processNavigationQueue(newPage);
    };
    UINavigationControllerImpl.prototype.supportedInterfaceOrientation = function () {
        return UIInterfaceOrientationMask.UIInterfaceOrientationMaskAll;
    };
    UINavigationControllerImpl.ObjCProtocols = [UINavigationControllerDelegate];
    return UINavigationControllerImpl;
})(UINavigationController);
var iOSFrame = (function () {
    function iOSFrame(owner) {
        this._controller = UINavigationControllerImpl.new().initWithOwner(owner);
        this._controller.delegate = this._controller;
        this._controller.automaticallyAdjustsScrollViewInsets = false;
        this.showNavigationBar = false;
    }
    Object.defineProperty(iOSFrame.prototype, "controller", {
        get: function () {
            return this._controller;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(iOSFrame.prototype, "showNavigationBar", {
        get: function () {
            return this._showNavigationBar;
        },
        set: function (value) {
            this._showNavigationBar = value;
            this._controller.navigationBarHidden = !value;
        },
        enumerable: true,
        configurable: true
    });
    return iOSFrame;
})();
