var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/time-picker/time-picker-common");
function onHourPropertyChanged(data) {
    var picker = data.object;
    if (picker.android) {
        picker.android.setCurrentHour(new java.lang.Integer(data.newValue));
    }
}
common.TimePicker.hourProperty.metadata.onSetNativeValue = onHourPropertyChanged;
function onMinutePropertyChanged(data) {
    var picker = data.object;
    if (picker.android) {
        picker.android.setCurrentMinute(new java.lang.Integer(data.newValue));
    }
}
common.TimePicker.minuteProperty.metadata.onSetNativeValue = onMinutePropertyChanged;
require("utils/module-merge").merge(common, exports);
var TimePicker = (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(TimePicker.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    TimePicker.prototype._createUI = function () {
        this._android = new android.widget.TimePicker(this._context);
        var that = new WeakRef(this);
        this._listener = new android.widget.TimePicker.OnTimeChangedListener({
            get owner() {
                return that.get();
            },
            onTimeChanged: function (picker, hour, minute) {
                if (this.owner) {
                    if (hour !== this.owner.hour) {
                        this.owner._onPropertyChangedFromNative(common.TimePicker.hourProperty, hour);
                    }
                    if (minute !== this.owner.minute) {
                        this.owner._onPropertyChangedFromNative(common.TimePicker.minuteProperty, minute);
                    }
                }
            }
        });
        this._android.setOnTimeChangedListener(this._listener);
    };
    return TimePicker;
})(common.TimePicker);
exports.TimePicker = TimePicker;
