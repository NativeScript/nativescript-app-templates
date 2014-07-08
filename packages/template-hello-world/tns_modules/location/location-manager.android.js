var types = require("location/location-types");
var appModule = require("application/application");

var LocationManager = (function () {
    function LocationManager() {
        this.desiredAccuracy = 3 /* HIGH */;
        this.updateDistance = 0;
        this.minimumUpdateTime = 200;
        this.isStarted = false;

        this.androidLocationManager = appModule.android.context.getSystemService(android.content.Context.LOCATION_SERVICE);
    }
    LocationManager.locationFromAndroidLocation = function (androidLocation) {
        var location = new types.Location();
        location.latitude = androidLocation.getLatitude();
        location.longitude = androidLocation.getLongitude();
        location.altitude = androidLocation.getAltitude();
        location.horizontalAccuracy = androidLocation.getAccuracy();
        location.verticalAccuracy = androidLocation.getAccuracy();
        location.speed = androidLocation.getSpeed();
        location.direction = androidLocation.getBearing();
        location.timestamp = new Date(androidLocation.getTime());
        location.android = androidLocation;

        return location;
    };

    LocationManager.androidLocationFromLocation = function (location) {
        var androidLocation = new android.location.Location('custom');
        androidLocation.setLatitude(location.latitude);
        androidLocation.setLongitude(location.longitude);
        if (location.altitude)
            androidLocation.setAltitude(location.altitude);
        if (location.speed)
            androidLocation.setSpeed(float(location.speed));
        if (location.direction)
            androidLocation.setBearing(float(location.direction));
        if (location.timestamp) {
            try  {
                androidLocation.setTime(long(location.timestamp.getTime()));
            } catch (e) {
                console.error('invalid location timestamp');
            }
        }
        return androidLocation;
    };

    LocationManager.isEnabled = function () {
        var criteria = new android.location.Criteria();
        criteria.setAccuracy(1);
        var lm = appModule.android.context.getSystemService(android.content.Context.LOCATION_SERVICE);
        return (lm.getBestProvider(criteria, true) != null) ? true : false;
    };

    LocationManager.distance = function (loc1, loc2) {
        if (!loc1.android) {
            loc1.android = LocationManager.androidLocationFromLocation(loc1);
        }
        if (!loc2.android) {
            loc2.android = LocationManager.androidLocationFromLocation(loc2);
        }
        return loc1.android.distanceTo(loc2.android);
    };

    LocationManager.prototype.startLocationMonitoring = function (onLocation, onError, options) {
        if (!this.isStarted) {
            var criteria = new android.location.Criteria();
            criteria.setAccuracy((this.desiredAccuracy === 3 /* HIGH */) ? 1 : 2);
            this.locationListener = new android.location.LocationListener({
                onLocationChanged: function (location1) {
                    if (this._onLocation) {
                        var location = LocationManager.locationFromAndroidLocation(location1);
                        if (this.maximumAge) {
                            if (location.timestamp.valueOf() + this.maximumAge > new Date().valueOf()) {
                                this._onLocation(location);
                            }
                        } else {
                            this._onLocation(location);
                        }
                    }
                },
                onProviderDisabled: function (provider) {
                },
                onProviderEnabled: function (provider) {
                },
                onStatusChanged: function (arg1, arg2, arg3) {
                }
            });

            if (options) {
                if (options.desiredAccuracy)
                    this.desiredAccuracy = options.desiredAccuracy;
                if (options.updateDistance)
                    this.updateDistance = options.updateDistance;
                if (options.minimumUpdateTime)
                    this.minimumUpdateTime = options.minimumUpdateTime;
            }

            this.locationListener._onLocation = onLocation;
            this.locationListener._onError = onError;
            this.locationListener.maximumAge = (options && ("number" === typeof options.maximumAge)) ? options.maximumAge : undefined;
            try  {
                this.androidLocationManager.requestLocationUpdates(long(this.minimumUpdateTime), float(this.updateDistance), criteria, this.locationListener, null);
                this.isStarted = true;
            } catch (e) {
                if (onError) {
                    onError(e);
                }
            }
        } else if (onError) {
            onError(new Error('location monitoring already started'));
        }
    };

    LocationManager.prototype.stopLocationMonitoring = function () {
        if (this.isStarted) {
            this.androidLocationManager.removeUpdates(this.locationListener);
            this.isStarted = false;
        }
    };

    Object.defineProperty(LocationManager.prototype, "lastKnownLocation", {
        get: function () {
            var criteria = new android.location.Criteria();
            criteria.setAccuracy((this.desiredAccuracy === 3 /* HIGH */) ? 1 : 2);
            try  {
                var providers = this.androidLocationManager.getProviders(criteria, false);
                var it = providers.iterator();
                while (it.hasNext()) {
                    var element = it.next();

                    var location = this.androidLocationManager.getLastKnownLocation(element);
                    if (location) {
                        return LocationManager.locationFromAndroidLocation(location);
                    }
                }
            } catch (e) {
                console.error(e.message);
            }

            return null;
        },
        enumerable: true,
        configurable: true
    });
    return LocationManager;
})();
exports.LocationManager = LocationManager;
//# sourceMappingURL=location-manager.android.js.map
