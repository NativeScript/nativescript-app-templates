function nslog(prefix, message) {
}
exports.helper_log = function (message) {
    nslog('log', message);
};
exports.info = function (message) {
    nslog('info', message);
};
exports.error = function (message) {
    nslog('error', message);
};
exports.warn = function (message) {
    nslog('warning', message);
};
exports.timeMillis = function () {
    return CACurrentMediaTime() * 1000;
};
