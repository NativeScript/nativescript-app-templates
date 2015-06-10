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
var UIGestureRecognizerImpl = (function (_super) {
    __extends(UIGestureRecognizerImpl, _super);
    function UIGestureRecognizerImpl() {
        _super.apply(this, arguments);
    }
    UIGestureRecognizerImpl.new = function () {
        return _super.new.call(this);
    };
    UIGestureRecognizerImpl.prototype.initWithOwnerTypeCallback = function (owner, type, callback) {
        this._owner = owner;
        this._type = type;
        if (callback) {
            this._callback = callback;
        }
        return this;
    };
    UIGestureRecognizerImpl.prototype.recognize = function (recognizer) {
        var callback = this._callback ? this._callback : this._owner._callback;
        var type = this._type;
        var target = this._owner._target;
        var args = {
            type: type,
            view: target,
            ios: recognizer,
            android: undefined
        };
        if (callback) {
            callback(args);
        }
    };
    UIGestureRecognizerImpl.ObjCExposedMethods = {
        "recognize": { returns: interop.types.void, params: [UIGestureRecognizer] }
    };
    return UIGestureRecognizerImpl;
})(NSObject);
var GesturesObserver = (function () {
    function GesturesObserver(callback) {
        this._callback = callback;
        this._recognizers = {};
    }
    GesturesObserver.prototype.observe = function (target, type) {
        var _this = this;
        if (target) {
            this._target = target;
            this._onTargetLoaded = function (args) {
                trace.write(_this._target + ".target loaded. _nativeView:" + _this._target._nativeView, "gestures");
                _this._attach(target, type);
            };
            this._onTargetUnloaded = function (args) {
                trace.write(_this._target + ".target unloaded. _nativeView:" + _this._target._nativeView, "gestures");
                _this._dettach();
            };
            target.on(view.View.loadedEvent, this._onTargetLoaded);
            target.on(view.View.unloadedEvent, this._onTargetUnloaded);
            if (target.isLoaded) {
                this._attach(target, type);
            }
        }
    };
    GesturesObserver.prototype._attach = function (target, type) {
        var _this = this;
        trace.write(target + "._attach() _nativeView:" + target._nativeView, "gestures");
        this._dettach();
        if (target && target._nativeView && target._nativeView.addGestureRecognizer) {
            var nativeView = target._nativeView;
            if (type & definition.GestureTypes.tap) {
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.tap));
            }
            if (type & definition.GestureTypes.doubleTap) {
                var r = this._createRecognizer(definition.GestureTypes.doubleTap);
                r.numberOfTapsRequired = 2;
                nativeView.addGestureRecognizer(r);
            }
            if (type & definition.GestureTypes.pinch) {
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.pinch, function (args) {
                    _this._executeCallback(_getPinchData(args));
                }));
            }
            if (type & definition.GestureTypes.pan) {
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.pan, function (args) {
                    _this._executeCallback(_getPanData(args, target._nativeView));
                }));
            }
            if (type & definition.GestureTypes.swipe) {
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.swipe, function (args) {
                    _this._executeCallback(_getSwipeData(args));
                }, UISwipeGestureRecognizerDirection.UISwipeGestureRecognizerDirectionDown));
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.swipe, function (args) {
                    _this._executeCallback(_getSwipeData(args));
                }, UISwipeGestureRecognizerDirection.UISwipeGestureRecognizerDirectionLeft));
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.swipe, function (args) {
                    _this._executeCallback(_getSwipeData(args));
                }, UISwipeGestureRecognizerDirection.UISwipeGestureRecognizerDirectionRight));
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.swipe, function (args) {
                    _this._executeCallback(_getSwipeData(args));
                }, UISwipeGestureRecognizerDirection.UISwipeGestureRecognizerDirectionUp));
            }
            if (type & definition.GestureTypes.rotation) {
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.rotation, function (args) {
                    _this._executeCallback(_getRotationData(args));
                }));
            }
            if (type & definition.GestureTypes.longPress) {
                nativeView.addGestureRecognizer(this._createRecognizer(definition.GestureTypes.longPress));
            }
        }
    };
    GesturesObserver.prototype._dettach = function () {
        trace.write(this._target + "._dettach() _nativeView:" + this._target._nativeView, "gestures");
        if (this._target && this._target._nativeView) {
            for (var name in this._recognizers) {
                if (this._recognizers.hasOwnProperty(name)) {
                    var item = this._recognizers[name];
                    this._target._nativeView.removeGestureRecognizer(item.recognizer);
                    item.recognizer = null;
                    item.target = null;
                }
            }
            this._recognizers = {};
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
    GesturesObserver.prototype._executeCallback = function (args) {
        if (this._callback) {
            this._callback(args);
        }
    };
    GesturesObserver.prototype._createRecognizer = function (type, callback, swipeDirection) {
        var recognizer;
        var name = definition.toString(type);
        var target = _createUIGestureRecognizerTarget(this, type, callback);
        var recognizerType = _getUIGestureRecognizerType(type);
        if (recognizerType) {
            if (type === definition.GestureTypes.swipe && swipeDirection) {
                name = name + swipeDirection.toString();
                recognizer = recognizerType.alloc().initWithTargetAction(target, "recognize");
                recognizer.direction = swipeDirection;
            }
            else {
                recognizer = recognizerType.alloc().initWithTargetAction(target, "recognize");
            }
            if (recognizer) {
                this._recognizers[name] = { recognizer: recognizer, target: target };
            }
        }
        return recognizer;
    };
    return GesturesObserver;
})();
exports.GesturesObserver = GesturesObserver;
function _createUIGestureRecognizerTarget(owner, type, callback) {
    return UIGestureRecognizerImpl.new().initWithOwnerTypeCallback(owner, type, callback);
}
function _getUIGestureRecognizerType(type) {
    var nativeType = null;
    if (type === definition.GestureTypes.tap) {
        nativeType = UITapGestureRecognizer;
    }
    else if (type === definition.GestureTypes.doubleTap) {
        nativeType = UITapGestureRecognizer;
    }
    else if (type === definition.GestureTypes.pinch) {
        nativeType = UIPinchGestureRecognizer;
    }
    else if (type === definition.GestureTypes.pan) {
        nativeType = UIPanGestureRecognizer;
    }
    else if (type === definition.GestureTypes.swipe) {
        nativeType = UISwipeGestureRecognizer;
    }
    else if (type === definition.GestureTypes.rotation) {
        nativeType = UIRotationGestureRecognizer;
    }
    else if (type === definition.GestureTypes.longPress) {
        nativeType = UILongPressGestureRecognizer;
    }
    return nativeType;
}
function _getSwipeDirection(direction) {
    if (direction === UISwipeGestureRecognizerDirection.UISwipeGestureRecognizerDirectionDown) {
        return definition.SwipeDirection.down;
    }
    else if (direction === UISwipeGestureRecognizerDirection.UISwipeGestureRecognizerDirectionLeft) {
        return definition.SwipeDirection.left;
    }
    else if (direction === UISwipeGestureRecognizerDirection.UISwipeGestureRecognizerDirectionRight) {
        return definition.SwipeDirection.right;
    }
    else if (direction === UISwipeGestureRecognizerDirection.UISwipeGestureRecognizerDirectionUp) {
        return definition.SwipeDirection.up;
    }
}
function _getPinchData(args) {
    var recognizer = args.ios;
    return {
        type: args.type,
        view: args.view,
        ios: args.ios,
        android: undefined,
        scale: recognizer.scale,
    };
}
function _getSwipeData(args) {
    var recognizer = args.ios;
    return {
        type: args.type,
        view: args.view,
        ios: args.ios,
        android: undefined,
        direction: _getSwipeDirection(recognizer.direction),
    };
}
function _getPanData(args, view) {
    var recognizer = args.ios;
    return {
        type: args.type,
        view: args.view,
        ios: args.ios,
        android: undefined,
        deltaX: recognizer.translationInView(view).x,
        deltaY: recognizer.translationInView(view).y
    };
}
function _getRotationData(args) {
    var recognizer = args.ios;
    return {
        type: args.type,
        view: args.view,
        ios: args.ios,
        android: undefined,
        rotation: recognizer.rotation * (180.0 / Math.PI),
    };
}
