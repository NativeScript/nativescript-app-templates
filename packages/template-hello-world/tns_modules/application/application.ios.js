var appModule = require("application/application-common");

require("utils/module-merge").merge(appModule, exports);

var initialized;
exports.init = function (nativeApp) {
    if (initialized) {
        return;
    }

    var app = new iOSApplication(nativeApp);
    exports.ios = app;
    app.init();

    initialized = true;
};

var iOSApplication = (function () {
    function iOSApplication(nativeApp) {
        this.nativeApp = nativeApp;
    }
    iOSApplication.prototype.init = function () {
        UIKit.UIResponder.extends({}, {
            name: "TNSAppDelegate"
        }).implements({
            protocol: "UIApplicationDelegate",
            implementation: {
                applicationDidFinishLaunchingWithOptions: function () {
                    log("Application launched: applicationDidFinishLaunchingWithOptions.");

                    this.window = new UIKit.UIWindow(UIKit.UIScreen.mainScreen().bounds);
                    this.window.backgroundColor = UIKit.UIColor.whiteColor();
                    this.window.makeKeyAndVisible();

                    if (exports.onLaunch) {
                        this.window.rootViewController = exports.onLaunch();
                    } else {
                        log("Missing Application.onLaunch");
                    }

                    log("applicationDidFinishLaunchingWithOptions finished.");
                    return true;
                },
                applicationDidBecomeActive: function (application) {
                    log("applicationDidBecomeActive: " + application);
                    if (exports.onResume) {
                        exports.onResume();
                    }
                },
                applicationWillResignActive: function (application) {
                    log("applicationWillResignActive: " + application);
                },
                applicationDidEnterBackground: function (application) {
                    log("applicationDidEnterBackground: " + application);
                    if (exports.onSuspend) {
                        exports.onSuspend();
                    }
                },
                applicationWillEnterForeground: function (application) {
                    log("applicationWillEnterForeground: " + application);
                },
                applicationWillTerminate: function (application) {
                    log("applicationWillTerminate: " + application);
                    if (exports.onExit) {
                        exports.onExit();
                    }
                },
                applicationDidReceiveMemoryWarning: function (application) {
                    log("applicationDidReceiveMemoryWarning: " + application);
                    if (exports.onLowMemory) {
                        exports.onLowMemory();
                    }
                },
                applicationOpenURLSourceApplicationAnnotation: function (application, url, annotation) {
                      Foundation.NSNotificationCenter.defaultCenter().postNotificationNameObjectUserInfo("com.telerik.TLKApplicationOpenURL", null, { TLKApplicationOpenURL: url , TLKApplication: application })
                }
            }
        });
    };
    return iOSApplication;
})();
//# sourceMappingURL=application.ios.js.map
