var timeoutCallbacks = {};

function createTimerAndGetId(callback, milliseconds, shouldRepeat) {
    var id = new Date().getUTCMilliseconds();

    var target = Foundation.NSObject.extends({ tick: function (timer) {
            callback();
        } }, { exposedMethods: { "tick:": "v@:@" } });
    var timer = Foundation.NSTimer.scheduledTimerWithTimeIntervalTargetSelectorUserInfoRepeats(milliseconds / 1000, new target(), "tick:", null, shouldRepeat);

    if (!timeoutCallbacks[id]) {
        timeoutCallbacks[id] = timer;
    }

    return id;
}

function setTimeout(callback, milliseconds) {
    if (typeof milliseconds === "undefined") { milliseconds = 0; }
    return createTimerAndGetId(callback, milliseconds, false);
}
exports.setTimeout = setTimeout;

function clearTimeout(id) {
    if (timeoutCallbacks[id]) {
        timeoutCallbacks[id].invalidate();
        timeoutCallbacks[id] = null;
    }
}
exports.clearTimeout = clearTimeout;

function setInterval(callback, milliseconds) {
    if (typeof milliseconds === "undefined") { milliseconds = 0; }
    return createTimerAndGetId(callback, milliseconds, true);
}
exports.setInterval = setInterval;

exports.clearInterval = exports.clearTimeout;
//# sourceMappingURL=timer.ios.js.map
