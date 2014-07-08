var Collections = (function () {
    function Collections() {
    }
    Collections.jsArrayToNSArray = function (str) {
        var arr = new Foundation.NSMutableArray();
        if ("undefined" != typeof str) {
            for (var element in str) {
                arr.addObject(str[element]);
            }
        }
        return arr;
    };

    Collections.nsArrayToJSArray = function (a) {
        var arr = [];
        if ("undefined" != typeof a) {
            for (var i = 0; i < a.count(); i++) {
                arr.push(a.objectAtIndex(i));
            }
        }

        return arr;
    };
    return Collections;
})();
exports.Collections = Collections;
//# sourceMappingURL=utils_ios.js.map
