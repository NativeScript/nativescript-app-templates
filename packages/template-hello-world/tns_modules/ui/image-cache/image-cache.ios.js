var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/image-cache/image-cache-common");
var imageSource = require("image-source");
module.exports.knownEvents = common.knownEvents;
var Cache = (function (_super) {
    __extends(Cache, _super);
    function Cache() {
        _super.apply(this, arguments);
    }
    Cache.prototype._downloadCore = function (request) {
        var that = this;
        imageSource.fromUrl(request.url).then(function (value) {
            that._onDownloadCompleted(request.key, value);
        });
    };
    return Cache;
})(common.Cache);
exports.Cache = Cache;
