var timeoutHandler;
var timeoutCallbacks = {};

function createHadlerAndGetId() {
    if (!timeoutHandler) {
        timeoutHandler = new android.os.Handler(android.os.Looper.getMainLooper());
    }

    return new Date().getUTCMilliseconds();
}

function setTimeout(callback, milliseconds) {
    if (typeof milliseconds === "undefined") { milliseconds = 0; }
    var id = createHadlerAndGetId();

    var runnable = new java.lang.Runnable({
        run: function () {
            callback();
            timeoutCallbacks[id] = null;
        }
    });

    if (!timeoutCallbacks[id]) {
        timeoutCallbacks[id] = runnable;
    }

    timeoutHandler.postDelayed(runnable, long(milliseconds));

    return id;
}
exports.setTimeout = setTimeout;

function clearTimeout(id) {
    if (timeoutCallbacks[id]) {
        timeoutHandler.removeCallbacks(timeoutCallbacks[id]);
        timeoutCallbacks[id] = null;
    }
}
exports.clearTimeout = clearTimeout;

function setInterval(callback, milliseconds) {
    if (typeof milliseconds === "undefined") { milliseconds = 0; }
    var id = createHadlerAndGetId();

    var runnable = new java.lang.Runnable({
        run: function () {
            callback();
            timeoutHandler.postDelayed(runnable, long(milliseconds));
        }
    });

    if (!timeoutCallbacks[id]) {
        timeoutCallbacks[id] = runnable;
    }

    timeoutHandler.postDelayed(runnable, long(milliseconds));

    return id;
}
exports.setInterval = setInterval;

exports.clearInterval = exports.clearTimeout;
//# sourceMappingURL=timer.android.js.map
