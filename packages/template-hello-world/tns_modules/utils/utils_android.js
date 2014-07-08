var Collections = (function () {
    function Collections() {
    }
    Collections.stringArrayToStringSet = function (str) {
        var hashSet = new java.util.HashSet();
        if ("undefined" != typeof str) {
            for (var element in str) {
                hashSet.add('' + str[element]);
            }
        }
        return hashSet;
    };

    Collections.stringSetToStringArray = function (stringSet) {
        var arr = [];
        if ("undefined" != typeof stringSet) {
            var it = stringSet.iterator();
            while (it.hasNext()) {
                var element = '' + it.next();
                arr.push(element);
            }
        }

        return arr;
    };
    return Collections;
})();
exports.Collections = Collections;
//# sourceMappingURL=utils_android.js.map
