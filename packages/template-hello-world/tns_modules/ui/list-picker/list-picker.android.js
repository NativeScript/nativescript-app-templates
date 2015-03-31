var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/list-picker/list-picker-common");
var types = require("utils/types");
require("utils/module-merge").merge(common, exports);
var ListPicker = (function (_super) {
    __extends(ListPicker, _super);
    function ListPicker() {
        _super.call(this);
    }
    Object.defineProperty(ListPicker.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    ListPicker.prototype._createUI = function () {
        this._android = new android.widget.NumberPicker(this._context);
        this._android.setMinValue(0);
        this._android.setDescendantFocusability(android.widget.NumberPicker.FOCUS_BLOCK_DESCENDANTS);
        var that = new WeakRef(this);
        this._formatter = new android.widget.NumberPicker.Formatter({
            get owner() {
                return that.get();
            },
            format: function (index) {
                if (this.owner) {
                    return this.owner._getItemAsString(index);
                }
                return index.toString();
            }
        });
        this._android.setFormatter(this._formatter);
        this._valueChangedListener = new android.widget.NumberPicker.OnValueChangeListener({
            get owner() {
                return that.get();
            },
            onValueChange: function (picker, oldVal, newVal) {
                if (this.owner) {
                    this.owner._onPropertyChangedFromNative(common.ListPicker.selectedIndexProperty, newVal);
                }
            }
        });
        this._android.setOnValueChangedListener(this._valueChangedListener);
        this._fixDisappearingSelectedItem();
    };
    ListPicker.prototype._onSelectedIndexPropertyChanged = function (data) {
        _super.prototype._onSelectedIndexPropertyChanged.call(this, data);
        if (this.android && types.isNumber(data.newValue)) {
            if (types.isDefined(this.items) && types.isNumber(this.items.length)) {
                this.android.setMaxValue(this.items.length - 1);
            }
            this.android.setValue(data.newValue);
        }
    };
    ListPicker.prototype._onItemsPropertyChanged = function (data) {
        if (this.android) {
            var maxValue;
            if (!data.newValue || !data.newValue.length) {
                maxValue = 0;
            }
            else {
                maxValue = data.newValue.length;
            }
            this.android.setMaxValue(maxValue);
            this.android.setWrapSelectorWheel(false);
        }
        this._updateSelectedIndexOnItemsPropertyChanged(data.newValue);
    };
    ListPicker.prototype._fixDisappearingSelectedItem = function () {
        var mInputTextField = java.lang.Class.forName("android.widget.NumberPicker").getDeclaredField("mInputText");
        mInputTextField.setAccessible(true);
        var mInputText = mInputTextField.get(this._android);
        mInputText.setFilters([]);
    };
    return ListPicker;
})(common.ListPicker);
exports.ListPicker = ListPicker;
