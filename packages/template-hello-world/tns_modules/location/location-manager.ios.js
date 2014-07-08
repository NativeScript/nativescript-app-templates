var types = require("location/location-types");

var LocationManager = (function () {
    function LocationManager() {
        this.isStarted = false;
        this.desiredAccuracy = 3 /* HIGH */;
        this.updateDistance = -1;
        this.iosLocationManager = new CoreLocation.CLLocationManager();
    }
    LocationManager.locationFromCLLocation = function (clLocation) {
        var location = new types.Location();
        location.latitude = clLocation.coordinate.latitude;
        location.longitude = clLocation.coordinate.longitude;
        location.altitude = clLocation.altitude;
        location.horizontalAccuracy = clLocation.horizontalAccuracy;
        location.verticalAccuracy = clLocation.verticalAccuracy;
        location.speed = clLocation.speed;
        location.direction = clLocation.course;
        location.timestamp = new Date(clLocation.timestamp.timeIntervalSince1970() * 1000);
        location.ios = clLocation;

        return location;
    };

    LocationManager.iosLocationFromLocation = function (location) {
        var hAccuracy = location.horizontalAccuracy ? location.horizontalAccuracy : -1;
        var vAccuracy = location.verticalAccuracy ? location.verticalAccuracy : -1;
        var speed = location.speed ? location.speed : -1;
        var course = location.direction ? location.direction : -1;
        var altitude = location.altitude ? location.altitude : -1;
        var timestamp = location.timestamp ? Foundation.NSDate.dateWithTimeIntervalSince1970(location.timestamp.getTime()) : null;
        var iosLocation = CoreLocation.CLLocation.initWithCoordinateAltitudeHorizontalAccuracyVerticalAccuracyCourseSpeedTimestamp(CoreLocation.CLLocationCoordinate2DMake(location.latitude, location.longitude), altitude, hAccuracy, vAccuracy, course, speed, timestamp);
        return iosLocation;
    };

    LocationManager.isEnabled = function () {
        if (CoreLocation.CLLocationManager.locationServicesEnabled()) {
            return true;
        }
        return false;
    };

    LocationManager.distance = function (loc1, loc2) {
        if (!loc1.ios) {
            loc1.ios = LocationManager.iosLocationFromLocation(loc1);
        }
        if (!loc2.ios) {
            loc2.ios = LocationManager.iosLocationFromLocation(loc2);
        }
        return loc1.ios.distanceFromLocation(loc2.ios);
    };

    LocationManager.prototype.startLocationMonitoring = function (onLocation, onError, options) {
        if (!this.isStarted) {
            var LocationListener = Foundation.NSObject.extends({
                setupWithFunctions: function (onLocation, onError) {
                    this.onLocation = onLocation;
                    this.onError = onError;

                    this.maximumAge = (options && ("number" === typeof options.maximumAge)) ? options.maximumAge : undefined;
                }
            }, {}).implements({
                protocol: "CLLocationManagerDelegate",
                implementation: {
                    locationManagerDidUpdateLocations: function (manager, locations) {
                        for (var i = 0; i < locations.count(); i++) {
                            var location = LocationManager.locationFromCLLocation(locations.objectAtIndex(i));
                            if (this.maximumAge) {
                                if (location.timestamp.valueOf() + this.maximumAge > new Date().valueOf()) {
                                    this.onLocation(location);
                                }
                            } else {
                                this.onLocation(location);
                            }
                        }
                    },
                    locationManagerDidFailWithError: function (manager, error) {
                        console.error('location error received ' + error.localizedDescription());
                        if (this.onError) {
                            this.onError(new Error(error.localizedDescription()));
                        }
                    }
                }
            });

            if (options) {
                if (options.desiredAccuracy)
                    this.desiredAccuracy = options.desiredAccuracy;
                if (options.updateDistance)
                    this.updateDistance = options.updateDistance;
            }

            this.listener = new LocationListener();
            this.listener.setupWithFunctions(onLocation, onError);
            this.iosLocationManager.delegate = this.listener;
            this.iosLocationManager.desiredAccuracy = this.desiredAccuracy;
            this.iosLocationManager.distanceFilter = this.updateDistance;
            this.iosLocationManager.startUpdatingLocation();
            this.isStarted = true;
        } else if (onError) {
            onError(new Error('location monitoring already started'));
        }
    };

    LocationManager.prototype.stopLocationMonitoring = function () {
        if (this.isStarted) {
            this.iosLocationManager.stopUpdatingLocation();
            this.iosLocationManager.delegate = null;
            this.listener = null;
            this.isStarted = false;
        }
    };

    Object.defineProperty(LocationManager.prototype, "lastKnownLocation", {
        get: function () {
            var clLocation = this.iosLocationManager.location;
            if (null != clLocation) {
                return LocationManager.locationFromCLLocation(clLocation);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return LocationManager;
})();
exports.LocationManager = LocationManager;
//# sourceMappingURL=location-manager.ios.js.map
