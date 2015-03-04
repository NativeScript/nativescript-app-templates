var TAG = 'JS';
exports.helper_log = function (message) {
    android.util.Log.v(TAG, message);
};
exports.info = function (message) {
    android.util.Log.i(TAG, message);
};
exports.error = function (message) {
    android.util.Log.e(TAG, message);
};
exports.warn = function (message) {
    android.util.Log.w(TAG, message);
};
exports.timeMillis = function () {
    return java.lang.System.nanoTime() / 1000000;
};
