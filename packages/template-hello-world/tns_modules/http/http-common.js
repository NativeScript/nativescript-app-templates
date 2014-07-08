var promises = require("promises/promises");
var http = require("http/http");

function getString(arg) {
    var d = promises.defer();

    http.request(typeof arg === "string" ? { url: arg, method: "GET" } : arg).then(function (r) {
        return d.resolve(r.content.toString());
    }).fail(function (e) {
        return d.reject(e);
    });

    return d.promise();
}
exports.getString = getString;

function getJSON(arg) {
    var d = promises.defer();

    http.request(typeof arg === "string" ? { url: arg, method: "GET" } : arg).then(function (r) {
        return d.resolve(r.content.toJSON());
    }).fail(function (e) {
        return d.reject(e);
    });

    return d.promise();
}
exports.getJSON = getJSON;

function getImage(arg) {
    var d = promises.defer();

    http.request(typeof arg === "string" ? { url: arg, method: "GET" } : arg).then(function (r) {
        return d.resolve(r.content.toImage());
    }).fail(function (e) {
        return d.reject(e);
    });

    return d.promise();
}
exports.getImage = getImage;
//# sourceMappingURL=http-common.js.map
