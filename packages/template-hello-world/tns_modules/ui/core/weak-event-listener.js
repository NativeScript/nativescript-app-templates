var definition = require("ui/core/weak-event-listener");
var WeakEventListener = (function () {
    function WeakEventListener() {
    }
    WeakEventListener.prototype.handlerCallback = function (eventData) {
        if (this.handler) {
            if (this.handlerContext) {
                this.handler.call(this.handlerContext, eventData);
            }
            else {
                this.handler(eventData);
            }
        }
    };
    WeakEventListener.prototype.init = function (options) {
        this.listener = options.targetWeakRef;
        this.sender = options.sourceWeakRef;
        this.eventName = options.eventName;
        this.handler = options.handler;
        if (options.handlerContext) {
            this.handlerContext = options.handlerContext;
        }
        var sourceInstance = this.sender.get();
        if (sourceInstance) {
            sourceInstance.addEventListener(this.eventName, this.handlerCallback, this);
        }
    };
    WeakEventListener.addWeakEventListener = function (options) {
        if (options.targetWeakRef && options.sourceWeakRef && options.eventName && options.handler && options.key) {
            var weakEventListener = new WeakEventListener();
            weakEventListener.init(options);
            var targetWeakEventListenersMap = WeakEventListener.getWeakMapValueByKeys([options.sourceWeakRef, options.targetWeakRef]);
            targetWeakEventListenersMap[options.key] = weakEventListener;
            return true;
        }
        else {
            return false;
        }
    };
    WeakEventListener.prototype.clear = function () {
        var sourceInstance = this.sender.get();
        if (sourceInstance) {
            sourceInstance.removeEventListener(this.eventName, this.handlerCallback, this);
            this.sender.clear();
        }
        this.listener = undefined;
        this.eventName = undefined;
        this.handler = undefined;
        this.handlerContext = undefined;
    };
    WeakEventListener.getWeakMapValueByKeys = function (keys) {
        var result;
        if (!WeakEventListener.rootWeakEventListenersMap) {
            WeakEventListener.rootWeakEventListenersMap = new WeakMap();
        }
        var currentMap = WeakEventListener.rootWeakEventListenersMap;
        var i;
        for (i = 0; i < keys.length - 1; i++) {
            if (currentMap.has(keys[i])) {
                currentMap = currentMap.get(keys[i]);
            }
            else {
                var innerMap = new WeakMap();
                currentMap.set(keys[i], innerMap);
                currentMap = innerMap;
            }
        }
        if (currentMap.has(keys[keys.length - 1])) {
            result = currentMap.get(keys[keys.length - 1]);
        }
        if (!result) {
            result = {};
            currentMap.set(keys[keys.length - 1], result);
        }
        return result;
    };
    WeakEventListener.removeWeakEventListener = function (options) {
        if (options && options.sourceWeakRef && options.targetWeakRef && options.key) {
            var weakMapValueForKey = WeakEventListener.getWeakMapValueByKeys([options.sourceWeakRef, options.targetWeakRef]);
            if (weakMapValueForKey && weakMapValueForKey[options.key]) {
                if (weakMapValueForKey[options.key] instanceof definition.WeakEventListener) {
                    weakMapValueForKey[options.key].clear();
                }
                delete weakMapValueForKey[options.key];
            }
        }
    };
    WeakEventListener.rootWeakEventListenersMap = new WeakMap();
    return WeakEventListener;
})();
exports.WeakEventListener = WeakEventListener;
