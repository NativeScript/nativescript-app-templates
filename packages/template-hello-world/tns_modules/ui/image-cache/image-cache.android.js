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
        _super.call(this);
        var that = new WeakRef(this);
        this._callback = new com.tns.Async.CompleteCallback({
            onComplete: function (result, context) {
                var instance = that.get();
                if (instance) {
                    instance._onBitmapDownloaded(result, context);
                }
            }
        });
    }
    Cache.prototype._downloadCore = function (request) {
        com.tns.Async.DownloadImage(request.url, this._callback, request.key);
    };
    Cache.prototype._onBitmapDownloaded = function (result, context) {
        var source = imageSource.fromNativeSource(result);
        this._onDownloadCompleted(context, source);
    };
    return Cache;
})(common.Cache);
exports.Cache = Cache;
