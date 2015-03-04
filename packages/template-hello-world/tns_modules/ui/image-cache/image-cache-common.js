var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
function isValidImage(url) {
    return url.indexOf(".png") !== -1 || url.indexOf(".jpg") !== -1;
}
var knownEvents;
(function (knownEvents) {
    knownEvents.downloaded = "downloaded";
})(knownEvents = exports.knownEvents || (exports.knownEvents = {}));
var Cache = (function (_super) {
    __extends(Cache, _super);
    function Cache() {
        _super.apply(this, arguments);
        this.maxRequests = 5;
        this._enabled = true;
        this._cache = {};
        this._pendingDownloads = {};
        this._queue = [];
        this._currentDownloads = 0;
    }
    Cache.prototype.enableDownload = function () {
        if (this._enabled) {
            return;
        }
        this._enabled = true;
        var request;
        while (this._queue.length > 0 && this._currentDownloads < this.maxRequests) {
            request = this._queue.pop();
            if (!(request.key in this._pendingDownloads)) {
                this._download(request);
            }
        }
    };
    Cache.prototype.disableDownload = function () {
        if (!this._enabled) {
            return;
        }
        this._enabled = false;
    };
    Cache.prototype.push = function (request) {
        this._addRequest(request, true);
    };
    Cache.prototype.enqueue = function (request) {
        this._addRequest(request, false);
    };
    Cache.prototype._addRequest = function (request, onTop) {
        if (request.key in this._pendingDownloads) {
            var existingRequest = this._pendingDownloads[request.key];
            this._mergeRequests(existingRequest, request);
        }
        else {
            var queueRequest;
            for (var i = 0; i < this._queue.length; i++) {
                if (this._queue[i].key === request.key) {
                    queueRequest = this._queue[i];
                    break;
                }
            }
            if (queueRequest) {
                this._mergeRequests(queueRequest, request);
            }
            else {
                if (this._shouldDownload(request, onTop)) {
                    this._download(request);
                }
            }
        }
    };
    Cache.prototype._mergeRequests = function (existingRequest, newRequest) {
        if (existingRequest.completed) {
            if (newRequest.completed) {
                var existingCompleted = existingRequest.completed;
                var stackCompleted = function (result, key) {
                    existingCompleted(result, key);
                    newRequest.completed(result, key);
                };
                existingRequest.completed = stackCompleted;
            }
        }
        else {
            existingRequest.completed = newRequest.completed;
        }
    };
    Cache.prototype.get = function (key) {
        var value = this._cache[key];
        if (value) {
            return value;
        }
        return undefined;
    };
    Cache.prototype.set = function (key, source) {
        this._cache[key] = source;
    };
    Cache.prototype.remove = function (key) {
        delete this._cache[key];
    };
    Cache.prototype.clear = function () {
        var keys = Object.keys(this._cache);
        var i;
        var length = keys.length;
        for (i = 0; i < length; i++) {
            delete this._cache[keys[i]];
        }
    };
    Cache.prototype._downloadCore = function (request) {
    };
    Cache.prototype._onDownloadCompleted = function (key, result) {
        var request = this._pendingDownloads[key];
        this._cache[request.key] = result;
        this._currentDownloads--;
        if (request.completed) {
            request.completed(result, request.key);
        }
        if (this.hasListeners(knownEvents.downloaded)) {
            this.notify({
                eventName: knownEvents.downloaded,
                object: this,
                key: key,
                image: result
            });
        }
        delete this._pendingDownloads[request.key];
        this._updateQueue();
    };
    Cache.prototype._shouldDownload = function (request, onTop) {
        if (request.key in this._cache || request.key in this._pendingDownloads) {
            return false;
        }
        if (!isValidImage(request.url)) {
            this._cache[request.key] = this.invalid;
            return false;
        }
        if (this._currentDownloads >= this.maxRequests || !this._enabled) {
            if (onTop) {
                this._queue.push(request);
            }
            else {
                this._queue.unshift(request);
            }
            return false;
        }
        return true;
    };
    Cache.prototype._download = function (request) {
        this._currentDownloads++;
        this._pendingDownloads[request.key] = request;
        this._downloadCore(request);
    };
    Cache.prototype._updateQueue = function () {
        if (!this._enabled || this._queue.length === 0 || this._currentDownloads === this.maxRequests) {
            return;
        }
        var request = this._queue.pop();
        this._download(request);
    };
    return Cache;
})(observable.Observable);
exports.Cache = Cache;
