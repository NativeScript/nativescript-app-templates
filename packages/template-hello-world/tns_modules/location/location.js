var promises = require("promises/promises");
var timer = require("timer/timer");
var types = require("location/location-types");
var locationManagerModule = require("location/location-manager");

require("utils/module-merge").merge(types, exports);

exports.getLocation = function (options) {
    var d = promises.defer();

    var timerId;
    var locationManager = new locationManagerModule.LocationManager();

    if (options && (0 === options.timeout)) {
        var location = locationManager.lastKnownLocation;
        if (location) {
            if (options && ("number" === typeof options.maximumAge)) {
                if (location.timestamp.valueOf() + options.maximumAge > new Date().valueOf()) {
                    d.resolve(location);
                } else {
                    d.reject(new Error("timeout is 0 and last known location is older than maximumAge"));
                }
            } else {
                d.resolve(location);
            }
        } else {
            d.reject(new Error("timeout is 0 and no known location found"));
        }
        return d.promise();
    }

    locationManager.startLocationMonitoring(function (location) {
        if (options && ("number" === typeof options.maximumAge)) {
            if (location.timestamp.valueOf() + options.maximumAge > new Date().valueOf()) {
                locationManager.stopLocationMonitoring();
                if ("undefined" !== typeof timerId) {
                    timer.clearTimeout(timerId);
                }
                d.resolve(location);
            }
        } else {
            locationManager.stopLocationMonitoring();
            if ("undefined" !== typeof timerId) {
                timer.clearTimeout(timerId);
            }
            d.resolve(location);
        }
    }, function (error) {
        console.error('Location error received: ' + error);
        locationManager.stopLocationMonitoring();
        if ("undefined" !== typeof timerId) {
            timer.clearTimeout(timerId);
        }
        d.reject(error);
    }, options);

    if (options && ("number" === typeof options.timeout)) {
        timerId = timer.setTimeout(function () {
            locationManager.stopLocationMonitoring();
            d.reject(new Error("timeout searching for location"));
        }, options.timeout);
    }

    return d.promise();
};

var LocationManager = (function () {
    function LocationManager() {
        this.nativeManager = new locationManagerModule.LocationManager();
    }
    LocationManager.isEnabled = function () {
        return locationManagerModule.LocationManager.isEnabled();
    };

    LocationManager.distance = function (loc1, loc2) {
        return locationManagerModule.LocationManager.distance(loc1, loc2);
    };

    LocationManager.prototype.startLocationMonitoring = function (onLocation, onError, options) {
        this.nativeManager.startLocationMonitoring(onLocation, onError, options);
    };

    LocationManager.prototype.stopLocationMonitoring = function () {
        this.nativeManager.stopLocationMonitoring();
    };

    Object.defineProperty(LocationManager.prototype, "lastKnownLocation", {
        get: function () {
            return this.nativeManager.lastKnownLocation;
        },
        enumerable: true,
        configurable: true
    });
    return LocationManager;
})();
exports.LocationManager = LocationManager;
//# sourceMappingURL=location.impl.js.map
