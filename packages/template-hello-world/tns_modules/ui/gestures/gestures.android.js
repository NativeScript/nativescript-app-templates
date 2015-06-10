var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/gestures/gestures-common");
var definition = require("ui/gestures");
var view = require("ui/core/view");
var trace = require("trace");
require("utils/module-merge").merge(common, exports);
var SWIPE_THRESHOLD = 100;
var SWIPE_VELOCITY_THRESHOLD = 100;
var GesturesObserver = (function () {
    function GesturesObserver(callback) {
        this._callback = callback;
    }
    Object.defineProperty(GesturesObserver.prototype, "callback", {
        get: function () {
            return this._callback;
        },
        enumerable: true,
        configurable: true
    });
    GesturesObserver.prototype.observe = function (target, type) {
        var _this = this;
        if (target) {
            this._target = target;
            this._onTargetLoaded = function (args) {
                trace.write(_this._target + ".target loaded. android:" + _this._target.android, "gestures");
                _this._attach(target, type);
            };
            this._onTargetUnloaded = function (args) {
                trace.write(_this._target + ".target unloaded. android:" + _this._target.android, "gestures");
                _this._dettach();
            };
            target.on(view.View.loadedEvent, this._onTargetLoaded);
            target.on(view.View.unloadedEvent, this._onTargetUnloaded);
            if (target.isLoaded) {
                this._attach(target, type);
            }
        }
    };
    GesturesObserver.prototype.disconnect = function () {
        this._dettach();
        if (this._target) {
            this._target.off(view.View.loadedEvent, this._onTargetLoaded);
            this._target.off(view.View.unloadedEvent, this._onTargetUnloaded);
            this._onTargetLoaded = null;
            this._onTargetUnloaded = null;
            this._target = null;
        }
    };
    GesturesObserver.prototype._dettach = function () {
        trace.write(this._target + "._detach() android:" + this._target.android, "gestures");
        if (this._target && this._target.android) {
            this._target.android.setOnTouchListener(null);
        }
        this._onTouchListener = null;
        this._simpleGestureDetector = null;
        this._scaleGestureDetector = null;
        this._swipeGestureDetector = null;
        this._panGestureDetector = null;
    };
    GesturesObserver.prototype._attach = function (target, type) {
        trace.write(this._target + "._attach() android:" + this._target.android, "gestures");
        this._dettach();
        if (type & definition.GestureTypes.tap || type & definition.GestureTypes.doubleTap || type & definition.GestureTypes.longPress) {
            this._simpleGestureDetector = new android.support.v4.view.GestureDetectorCompat(target._context, new TapAndDoubleTapGestureListener(this, this._target));
        }
        if (type & definition.GestureTypes.pinch) {
            this._scaleGestureDetector = new android.view.ScaleGestureDetector(target._context, new PinchGestureListener(this, this._target));
        }
        if (type & definition.GestureTypes.swipe) {
            this._swipeGestureDetector = new android.support.v4.view.GestureDetectorCompat(target._context, new SwipeGestureListener(this, this._target));
        }
        if (type & definition.GestureTypes.pan) {
            this._panGestureDetector = new android.support.v4.view.GestureDetectorCompat(target._context, new PanGestureListener(this, this._target));
        }
        var that = new WeakRef(this);
        this._onTouchListener = new android.view.View.OnTouchListener({
            onTouch: function (view, motionEvent) {
                var owner = that.get();
                if (!owner) {
                    return false;
                }
                if (owner._simpleGestureDetector) {
                    owner._simpleGestureDetector.onTouchEvent(motionEvent);
                }
                if (owner._scaleGestureDetector) {
                    owner._scaleGestureDetector.onTouchEvent(motionEvent);
                }
                if (owner._swipeGestureDetector) {
                    owner._swipeGestureDetector.onTouchEvent(motionEvent);
                }
                if (owner._panGestureDetector) {
                    owner._panGestureDetector.onTouchEvent(motionEvent);
                }
                if (type & definition.GestureTypes.rotation && motionEvent.getPointerCount() === 2) {
                    var deltaX = motionEvent.getX(0) - motionEvent.getX(1);
                    var deltaY = motionEvent.getY(0) - motionEvent.getY(1);
                    var radians = Math.atan(deltaY / deltaX);
                    var degrees = radians * (180 / Math.PI);
                    var args = {
                        type: definition.GestureTypes.rotation,
                        view: owner._target,
                        android: motionEvent,
                        rotation: degrees,
                    };
                    var observer = that.get();
                    if (observer && observer.callback) {
                        observer.callback(args);
                    }
                }
                return true;
            }
        });
        target.android.setOnTouchListener(this._onTouchListener);
    };
    return GesturesObserver;
})();
exports.GesturesObserver = GesturesObserver;
function _getArgs(type, view, e) {
    return {
        type: type,
        view: view,
        android: e
    };
}
function _getSwipeArgs(direction, view, initialEvent, currentEvent) {
    return {
        type: definition.GestureTypes.swipe,
        view: view,
        android: { initial: initialEvent, current: currentEvent },
        direction: direction
    };
}
function _getPanArgs(deltaX, deltaY, view, initialEvent, currentEvent) {
    return {
        type: definition.GestureTypes.pan,
        view: view,
        android: { initial: initialEvent, current: currentEvent },
        deltaX: deltaX,
        deltaY: deltaY
    };
}
function _executeCallback(observer, args) {
    if (observer && observer.callback) {
        observer.callback(args);
    }
}
var TapAndDoubleTapGestureListener = (function (_super) {
    __extends(TapAndDoubleTapGestureListener, _super);
    function TapAndDoubleTapGestureListener(observer, target) {
        _super.call(this);
        this._observer = observer;
        this._target = target;
        return global.__native(this);
    }
    TapAndDoubleTapGestureListener.prototype.onSingleTapConfirmed = function (motionEvent) {
        var args = _getArgs(definition.GestureTypes.tap, this._target, motionEvent);
        _executeCallback(this._observer, args);
        return true;
    };
    TapAndDoubleTapGestureListener.prototype.onDoubleTap = function (motionEvent) {
        var args = _getArgs(definition.GestureTypes.doubleTap, this._target, motionEvent);
        _executeCallback(this._observer, args);
        return true;
    };
    TapAndDoubleTapGestureListener.prototype.onDown = function (motionEvent) {
        return true;
    };
    TapAndDoubleTapGestureListener.prototype.onLongPress = function (motionEvent) {
        var args = _getArgs(definition.GestureTypes.longPress, this._target, motionEvent);
        _executeCallback(this._observer, args);
        return true;
    };
    return TapAndDoubleTapGestureListener;
})(android.view.GestureDetector.SimpleOnGestureListener);
var PinchGestureListener = (function (_super) {
    __extends(PinchGestureListener, _super);
    function PinchGestureListener(observer, target) {
        _super.call(this);
        this._observer = observer;
        this._target = target;
        return global.__native(this);
    }
    PinchGestureListener.prototype.onScale = function (detector) {
        var args = {
            type: definition.GestureTypes.pinch,
            view: this._target,
            android: detector,
            scale: detector.getScaleFactor()
        };
        _executeCallback(this._observer, args);
        return true;
    };
    return PinchGestureListener;
})(android.view.ScaleGestureDetector.SimpleOnScaleGestureListener);
var SwipeGestureListener = (function (_super) {
    __extends(SwipeGestureListener, _super);
    function SwipeGestureListener(observer, target) {
        _super.call(this);
        this._observer = observer;
        this._target = target;
        return global.__native(this);
    }
    SwipeGestureListener.prototype.onDown = function (motionEvent) {
        return true;
    };
    SwipeGestureListener.prototype.onFling = function (initialEvent, currentEvent, velocityX, velocityY) {
        var result = false;
        var args;
        try {
            var deltaY = currentEvent.getY() - initialEvent.getY();
            var deltaX = currentEvent.getX() - initialEvent.getX();
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD) {
                    if (deltaX > 0) {
                        args = _getSwipeArgs(definition.SwipeDirection.right, this._target, initialEvent, currentEvent);
                        _executeCallback(this._observer, args);
                        result = true;
                    }
                    else {
                        args = _getSwipeArgs(definition.SwipeDirection.left, this._target, initialEvent, currentEvent);
                        _executeCallback(this._observer, args);
                        result = true;
                    }
                }
            }
            else {
                if (Math.abs(deltaY) > SWIPE_THRESHOLD && Math.abs(velocityY) > SWIPE_VELOCITY_THRESHOLD) {
                    if (deltaY > 0) {
                        args = _getSwipeArgs(definition.SwipeDirection.down, this._target, initialEvent, currentEvent);
                        _executeCallback(this._observer, args);
                        result = true;
                    }
                    else {
                        args = _getSwipeArgs(definition.SwipeDirection.up, this._target, initialEvent, currentEvent);
                        _executeCallback(this._observer, args);
                        result = true;
                    }
                }
            }
        }
        catch (ex) {
        }
        return result;
    };
    return SwipeGestureListener;
})(android.view.GestureDetector.SimpleOnGestureListener);
var PanGestureListener = (function (_super) {
    __extends(PanGestureListener, _super);
    function PanGestureListener(observer, target) {
        _super.call(this);
        this._observer = observer;
        this._target = target;
        return global.__native(this);
    }
    PanGestureListener.prototype.onDown = function (motionEvent) {
        return false;
    };
    PanGestureListener.prototype.onScroll = function (initialEvent, currentEvent, lastDeltaX, lastDeltaY) {
        var deltaX = currentEvent.getX() - initialEvent.getX();
        var deltaY = currentEvent.getY() - initialEvent.getY();
        var args = _getPanArgs(deltaX, deltaY, this._target, initialEvent, currentEvent);
        _executeCallback(this._observer, args);
        return true;
    };
    return PanGestureListener;
})(android.view.GestureDetector.SimpleOnGestureListener);
