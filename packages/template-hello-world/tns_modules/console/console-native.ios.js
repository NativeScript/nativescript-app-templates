exports.helper_log = function (message) {
    log('log: ' + message);
};

exports.info = function (message) {
    log('info: ' + message);
};

exports.error = function (message) {
    log('error: ' + message);
};

exports.warn = function (message) {
    log('warning: ' + message);
};

exports.timeMillis = function () {
    return QuartzCore.CACurrentMediaTime() * 1000;
};
//# sourceMappingURL=console-native.ios.js.map
