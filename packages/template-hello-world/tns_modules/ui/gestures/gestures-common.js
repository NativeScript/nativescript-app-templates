var definition = require("ui/gestures");
(function (GestureTypes) {
    GestureTypes[GestureTypes["tap"] = 1 << 0] = "tap";
    GestureTypes[GestureTypes["doubleTap"] = 1 << 1] = "doubleTap";
    GestureTypes[GestureTypes["pinch"] = 1 << 2] = "pinch";
    GestureTypes[GestureTypes["pan"] = 1 << 3] = "pan";
    GestureTypes[GestureTypes["swipe"] = 1 << 4] = "swipe";
    GestureTypes[GestureTypes["rotation"] = 1 << 5] = "rotation";
    GestureTypes[GestureTypes["longPress"] = 1 << 6] = "longPress";
})(exports.GestureTypes || (exports.GestureTypes = {}));
var GestureTypes = exports.GestureTypes;
(function (GestureStateTypes) {
    GestureStateTypes[GestureStateTypes["possible"] = 1 << 0] = "possible";
    GestureStateTypes[GestureStateTypes["recognized"] = 1 << 1] = "recognized";
    GestureStateTypes[GestureStateTypes["failed"] = 1 << 2] = "failed";
    GestureStateTypes[GestureStateTypes["cancelled"] = 1 << 3] = "cancelled";
    GestureStateTypes[GestureStateTypes["began"] = 1 << 4] = "began";
    GestureStateTypes[GestureStateTypes["changed"] = 1 << 5] = "changed";
    GestureStateTypes[GestureStateTypes["ended"] = 1 << 6] = "ended";
})(exports.GestureStateTypes || (exports.GestureStateTypes = {}));
var GestureStateTypes = exports.GestureStateTypes;
(function (SwipeDirection) {
    SwipeDirection[SwipeDirection["right"] = 1 << 0] = "right";
    SwipeDirection[SwipeDirection["left"] = 1 << 1] = "left";
    SwipeDirection[SwipeDirection["up"] = 1 << 2] = "up";
    SwipeDirection[SwipeDirection["down"] = 1 << 3] = "down";
})(exports.SwipeDirection || (exports.SwipeDirection = {}));
var SwipeDirection = exports.SwipeDirection;
function observe(target, type, callback) {
    var observer = new definition.GesturesObserver(callback);
    observer.observe(target, type);
    return observer;
}
exports.observe = observe;
function toString(type, separator) {
    var types = new Array();
    if (type & definition.GestureTypes.tap) {
        types.push("tap");
    }
    if (type & definition.GestureTypes.doubleTap) {
        types.push("doubleTap");
    }
    if (type & definition.GestureTypes.pinch) {
        types.push("pinch");
    }
    if (type & definition.GestureTypes.pan) {
        types.push("pan");
    }
    if (type & definition.GestureTypes.swipe) {
        types.push("swipe");
    }
    if (type & definition.GestureTypes.rotation) {
        types.push("rotation");
    }
    if (type & definition.GestureTypes.longPress) {
        types.push("longPress");
    }
    return types.join(separator);
}
exports.toString = toString;
function fromString(type) {
    var t = type.trim().toLowerCase();
    if (t === "tap") {
        return definition.GestureTypes.tap;
    }
    else if (t === "doubletap") {
        return definition.GestureTypes.doubleTap;
    }
    else if (t === "pinch") {
        return definition.GestureTypes.pinch;
    }
    else if (t === "pan") {
        return definition.GestureTypes.pan;
    }
    else if (t === "swipe") {
        return definition.GestureTypes.swipe;
    }
    else if (t === "rotation") {
        return definition.GestureTypes.rotation;
    }
    else if (t === "longpress") {
        return definition.GestureTypes.longPress;
    }
    return undefined;
}
exports.fromString = fromString;
