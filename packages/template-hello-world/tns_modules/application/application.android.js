var appModule = require("application/application-common");

require("utils/module-merge").merge(appModule, exports);

var callbacks = android.app.Application.ActivityLifecycleCallbacks;

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
        },
        onActivityDestroyed: function (activity) {
            if (activity === androidApp.currentActivity) {
                androidApp.currentActivity = undefined;
            }

            if (androidApp.onActivityDestroyed) {
                androidApp.onActivityDestroyed(activity);
            }
        },
        onActivityPaused: function (activity) {
            if (androidApp.onActivityPaused) {
                androidApp.onActivityPaused(activity);
            }
        },
        onActivityResumed: function (activity) {
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
            androidApp.currentActivity = activity;

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

var initialized;
exports.init = function (nativeApp) {
    if (initialized) {
        return;
    }

    var app = new AndroidApplication(nativeApp);
    exports.android = app;
    app.init();

    initialized = true;
};

var AndroidApplication = (function () {
    function AndroidApplication(nativeApp) {
        this.nativeApp = nativeApp;
        this.packageName = nativeApp.getPackageName();
        this.context = nativeApp.getApplicationContext();
    }
    AndroidApplication.prototype.init = function () {
        this._eventsToken = initEvents();
        this.nativeApp.registerActivityLifecycleCallbacks(this._eventsToken);
        this.context = this.nativeApp.getApplicationContext();
    };
    return AndroidApplication;
})();
//# sourceMappingURL=application.android.js.map
