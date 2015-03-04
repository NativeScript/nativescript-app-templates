var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var textBase = require("ui/text-base");
var proxy = require("ui/core/proxy");
var dependencyObservable = require("ui/core/dependency-observable");
var enums = require("ui/enums");
exports.keyboardTypeProperty = new dependencyObservable.Property("keyboardType", "EditableTextBase", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));
function onKeyboardTypePropertyChanged(data) {
    var editableTextBase = data.object;
    editableTextBase._onKeyboardTypePropertyChanged(data);
}
exports.keyboardTypeProperty.metadata.onSetNativeValue = onKeyboardTypePropertyChanged;
exports.returnKeyTypeProperty = new dependencyObservable.Property("returnKeyType", "EditableTextBase", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));
function onReturnKeyTypePropertyChanged(data) {
    var editableTextBase = data.object;
    editableTextBase._onReturnKeyTypePropertyChanged(data);
}
exports.returnKeyTypeProperty.metadata.onSetNativeValue = onReturnKeyTypePropertyChanged;
exports.editableProperty = new dependencyObservable.Property("editable", "EditableTextBase", new proxy.PropertyMetadata(true, dependencyObservable.PropertyMetadataSettings.None));
function onEditablePropertyChanged(data) {
    var editableTextBase = data.object;
    editableTextBase._onEditablePropertyChanged(data);
}
exports.editableProperty.metadata.onSetNativeValue = onEditablePropertyChanged;
exports.updateTextTriggerProperty = new dependencyObservable.Property("updateTextTrigger", "EditableTextBase", new proxy.PropertyMetadata(enums.UpdateTextTrigger.textChanged, dependencyObservable.PropertyMetadataSettings.None));
var EditableTextBase = (function (_super) {
    __extends(EditableTextBase, _super);
    function EditableTextBase(options) {
        _super.call(this, options);
    }
    Object.defineProperty(EditableTextBase.prototype, "keyboardType", {
        get: function () {
            return this._getValue(exports.keyboardTypeProperty);
        },
        set: function (value) {
            this._setValue(exports.keyboardTypeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableTextBase.prototype, "returnKeyType", {
        get: function () {
            return this._getValue(exports.returnKeyTypeProperty);
        },
        set: function (value) {
            this._setValue(exports.returnKeyTypeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableTextBase.prototype, "editable", {
        get: function () {
            return this._getValue(exports.editableProperty);
        },
        set: function (value) {
            this._setValue(exports.editableProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableTextBase.prototype, "updateTextTrigger", {
        get: function () {
            return this._getValue(exports.updateTextTriggerProperty);
        },
        set: function (value) {
            this._setValue(exports.updateTextTriggerProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    EditableTextBase.prototype.dismissSoftInput = function () {
    };
    EditableTextBase.prototype._onKeyboardTypePropertyChanged = function (data) {
    };
    EditableTextBase.prototype._onReturnKeyTypePropertyChanged = function (data) {
    };
    EditableTextBase.prototype._onEditablePropertyChanged = function (data) {
    };
    return EditableTextBase;
})(textBase.TextBase);
exports.EditableTextBase = EditableTextBase;
