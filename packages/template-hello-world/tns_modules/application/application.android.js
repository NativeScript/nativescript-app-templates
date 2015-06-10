var appModule = require("application/application-common");
var dts = require("application");
var frame = require("ui/frame");
var types = require("utils/types");
require("utils/module-merge").merge(appModule, exports);
var callbacks = android.app.Application.ActivityLifecycleCallbacks;
exports.mainModule;
var initEvents = function () {
    var androidApp = exports.android;
    var lifecycleCallbacks = new callbacks({
        onActivityCreated: function (activity, bundle) {
            if (!androidApp.startActivity) {
                androidApp.startActivity = activity;
                if (androidApp.onActivityCreated) {
                    androidApp.onActivityCreated(activity, bundle);
                }
            }
            androidApp.currentContext = activity;
        },
        onActivityDestroyed: function (activity) {
            if (activity === androidApp.foregroundActivity) {
                androidApp.foregroundActivity = undefined;
            }
            if (activity === androidApp.currentContext) {
                androidApp.currentContext = undefined;
            }
            if (activity === androidApp.startActivity) {
                if (exports.onExit) {
                    exports.onExit();
                }
                androidApp.startActivity = undefined;
            }
            if (androidApp.onActivityDestroyed) {
                androidApp.onActivityDestroyed(activity);
            }
            gc();
        },
        onActivityPaused: function (activity) {
            if (activity === androidApp.foregroundActivity) {
                if (exports.onSuspend) {
                    exports.onSuspend();
                }
            }
            if (androidApp.onActivityPaused) {
                androidApp.onActivityPaused(activity);
            }
        },
        onActivityResumed: function (activity) {
            if (activity === androidApp.foregroundActivity) {
                if (exports.onResume) {
                    exports.onResume();
                }
            }
            if (androidApp.onActivityResumed) {
                androidApp.onActivityResumed(activity);
            }
        },
        onActivitySaveInstanceState: function (activity, bundle) {
            if (androidApp.onSaveActivityState) {
                androidApp.onSaveActivityState(activity, bundle);
            }
        },
        onActivityStarted: function (activity) {
            androidApp.foregroundActivity = activity;
            if (androidApp.onActivityStarted) {
                androidApp.onActivityStarted(activity);
            }
        },
        onActivityStopped: function (activity) {
            if (androidApp.onActivityStopped) {
                androidApp.onActivityStopped(activity);
            }
        }
    });
    return lifecycleCallbacks;
};
app.init({
    getActivity: function (intent) {
        return exports.android.getActivity(intent);
    },
    onCreate: function () {
        var androidApp = new AndroidApplication(this);
        exports.android = androidApp;
        androidApp.init();
    }
});
var AndroidApplication = (function () {
    function AndroidApplication(nativeApp) {
        this.nativeApp = nativeApp;
        this.packageName = nativeApp.getPackageName();
        this.context = nativeApp.getApplicationContext();
    }
    AndroidApplication.prototype.getActivity = function (intent) {
        if (intent && intent.getAction() === android.content.Intent.ACTION_MAIN) {
            if (exports.onLaunch) {
                exports.onLaunch(intent);
            }
        }
        var topFrame = frame.topmost();
        if (!topFrame) {
            if (exports.mainModule) {
                topFrame = new frame.Frame();
                topFrame.navigate(exports.mainModule);
            }
            else {
                throw new Error("A Frame must be used to navigate to a Page.");
            }
        }
        return topFrame.android.onActivityRequested(intent);
    };
    AndroidApplication.prototype.init = function () {
        this._eventsToken = initEvents();
        this.nativeApp.registerActivityLifecycleCallbacks(this._eventsToken);
        this.context = this.nativeApp.getApplicationContext();
    };
    return AndroidApplication;
})();
global.__onUncaughtError = function (error) {
    if (!types.isFunction(exports.onUncaughtError)) {
        return;
    }
    var nsError = {
        message: error.message,
        name: error.name,
        nativeError: error.nativeException
    };
    exports.onUncaughtError(nsError);
};
exports.start = function () {
    dts.loadCss();
};
