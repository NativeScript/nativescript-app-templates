var definition = require("ui/gestures");
(function (GestureTypes) {
    GestureTypes[GestureTypes["Tap"] = 1 << 0] = "Tap";
    GestureTypes[GestureTypes["DoubleTap"] = 1 << 1] = "DoubleTap";
    GestureTypes[GestureTypes["Pinch"] = 1 << 2] = "Pinch";
    GestureTypes[GestureTypes["Pan"] = 1 << 3] = "Pan";
    GestureTypes[GestureTypes["Swipe"] = 1 << 4] = "Swipe";
    GestureTypes[GestureTypes["Rotation"] = 1 << 5] = "Rotation";
    GestureTypes[GestureTypes["LongPress"] = 1 << 6] = "LongPress";
})(exports.GestureTypes || (exports.GestureTypes = {}));
var GestureTypes = exports.GestureTypes;
(function (GestureStateTypes) {
    GestureStateTypes[GestureStateTypes["Possible"] = 1 << 0] = "Possible";
    GestureStateTypes[GestureStateTypes["Recognized"] = 1 << 1] = "Recognized";
    GestureStateTypes[GestureStateTypes["Failed"] = 1 << 2] = "Failed";
    GestureStateTypes[GestureStateTypes["Cancelled"] = 1 << 3] = "Cancelled";
    GestureStateTypes[GestureStateTypes["Began"] = 1 << 4] = "Began";
    GestureStateTypes[GestureStateTypes["Changed"] = 1 << 5] = "Changed";
    GestureStateTypes[GestureStateTypes["Ended"] = 1 << 6] = "Ended";
})(exports.GestureStateTypes || (exports.GestureStateTypes = {}));
var GestureStateTypes = exports.GestureStateTypes;
(function (SwipeDirection) {
    SwipeDirection[SwipeDirection["Right"] = 1 << 0] = "Right";
    SwipeDirection[SwipeDirection["Left"] = 1 << 1] = "Left";
    SwipeDirection[SwipeDirection["Up"] = 1 << 2] = "Up";
    SwipeDirection[SwipeDirection["Down"] = 1 << 3] = "Down";
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
    if (type & definition.GestureTypes.Tap) {
        types.push("Tap");
    }
    if (type & definition.GestureTypes.DoubleTap) {
        types.push("DoubleTap");
    }
    if (type & definition.GestureTypes.Pinch) {
        types.push("Pinch");
    }
    if (type & definition.GestureTypes.Pan) {
        types.push("Pan");
    }
    if (type & definition.GestureTypes.Swipe) {
        types.push("Swipe");
    }
    if (type & definition.GestureTypes.Rotation) {
        types.push("Rotation");
    }
    if (type & definition.GestureTypes.LongPress) {
        types.push("LongPress");
    }
    return types.join(separator);
}
exports.toString = toString;
function fromString(type) {
    var t = type.trim().toLowerCase();
    if (t === "tap") {
        return definition.GestureTypes.Tap;
    }
    else if (t === "doubletap") {
        return definition.GestureTypes.DoubleTap;
    }
    else if (t === "pinch") {
        return definition.GestureTypes.Pinch;
    }
    else if (t === "pan") {
        return definition.GestureTypes.Pan;
    }
    else if (t === "swipe") {
        return definition.GestureTypes.Swipe;
    }
    else if (t === "rotation") {
        return definition.GestureTypes.Rotation;
    }
    else if (t === "longpress") {
        return definition.GestureTypes.LongPress;
    }
    return undefined;
}
exports.fromString = fromString;
