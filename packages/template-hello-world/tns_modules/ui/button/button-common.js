var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dependencyObservable = require("ui/core/dependency-observable");
var view = require("ui/core/view");
var proxy = require("ui/core/proxy");
var observable = require("data/observable");
var weakEventListener = require("ui/core/weak-event-listener");
var knownEvents;
(function (knownEvents) {
    knownEvents.tap = "tap";
})(knownEvents = exports.knownEvents || (exports.knownEvents = {}));
var textProperty = new dependencyObservable.Property("text", "Button", new proxy.PropertyMetadata("", dependencyObservable.PropertyMetadataSettings.AffectsLayout));
var formattedTextProperty = new dependencyObservable.Property("formattedText", "Button", new proxy.PropertyMetadata("", dependencyObservable.PropertyMetadataSettings.AffectsLayout));
function onTextPropertyChanged(data) {
    var button = data.object;
    button._onTextPropertyChanged(data);
}
function onFormattedTextPropertyChanged(data) {
    var button = data.object;
    button._onFormattedTextPropertyChanged(data);
}
textProperty.metadata.onSetNativeValue = onTextPropertyChanged;
formattedTextProperty.metadata.onSetNativeValue = onFormattedTextPropertyChanged;
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this.formattedText) {
            this.formattedText.updateSpansBindingContext(newValue);
        }
    };
    Object.defineProperty(Button.prototype, "text", {
        get: function () {
            return this._getValue(Button.textProperty);
        },
        set: function (value) {
            this._setValue(Button.textProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "formattedText", {
        get: function () {
            return this._getValue(Button.formattedTextProperty);
        },
        set: function (value) {
            if (this.formattedText !== value) {
                var weakEventOptions = {
                    targetWeakRef: new WeakRef(this),
                    eventName: observable.knownEvents.propertyChange,
                    sourceWeakRef: new WeakRef(value),
                    handler: this.onFormattedTextChanged,
                    handlerContext: this,
                    key: "formattedText"
                };
                if (this.formattedText) {
                    weakEventListener.WeakEventListener.removeWeakEventListener(weakEventOptions);
                }
                this._setValue(Button.formattedTextProperty, value);
                if (value) {
                    weakEventListener.WeakEventListener.addWeakEventListener(weakEventOptions);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.onFormattedTextChanged = function (eventData) {
        this.setFormattedTextPropertyToNative(eventData.value);
    };
    Button.prototype._onTextPropertyChanged = function (data) {
        if (this.android) {
            this.android.setText(data.newValue + "");
        }
        if (this.ios) {
            this.ios.setTitleForState(data.newValue + "", UIControlState.UIControlStateNormal);
        }
    };
    Button.prototype.setFormattedTextPropertyToNative = function (value) {
        if (this.android) {
            this.android.setText(value._formattedText);
        }
        if (this.ios) {
            this.ios.setAttributedTitleForState(value._formattedText, UIControlState.UIControlStateNormal);
        }
    };
    Button.prototype._onFormattedTextPropertyChanged = function (data) {
        if (data.newValue) {
            data.newValue.parent = this;
        }
        this.setFormattedTextPropertyToNative(data.newValue);
    };
    Button.textProperty = textProperty;
    Button.formattedTextProperty = formattedTextProperty;
    return Button;
})(view.View);
exports.Button = Button;
