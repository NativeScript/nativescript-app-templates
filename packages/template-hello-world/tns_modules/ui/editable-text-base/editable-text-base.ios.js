var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/editable-text-base/editable-text-base-common");
var enums = require("ui/enums");
var EditableTextBase = (function (_super) {
    __extends(EditableTextBase, _super);
    function EditableTextBase(options) {
        _super.call(this, options);
    }
    EditableTextBase.prototype.dismissSoftInput = function () {
        this.ios.resignFirstResponder();
    };
    EditableTextBase.prototype._onKeyboardTypePropertyChanged = function (data) {
        var newKeyboardType;
        switch (data.newValue) {
            case enums.KeyboardType.datetime:
                newKeyboardType = UIKeyboardType.UIKeyboardTypeNumbersAndPunctuation;
                break;
            case enums.KeyboardType.phone:
                newKeyboardType = UIKeyboardType.UIKeyboardTypePhonePad;
                break;
            case enums.KeyboardType.number:
                newKeyboardType = UIKeyboardType.UIKeyboardTypeNumbersAndPunctuation;
                break;
            case enums.KeyboardType.url:
                newKeyboardType = UIKeyboardType.UIKeyboardTypeURL;
                break;
            case enums.KeyboardType.email:
                newKeyboardType = UIKeyboardType.UIKeyboardTypeEmailAddress;
                break;
            default:
                newKeyboardType = UIKeyboardType.UIKeyboardTypeDefault;
                break;
        }
        this.ios.keyboardType = newKeyboardType;
    };
    EditableTextBase.prototype._onReturnKeyTypePropertyChanged = function (data) {
        var newReturnKeyType;
        switch (data.newValue) {
            case enums.ReturnKeyType.done:
                newReturnKeyType = UIReturnKeyType.UIReturnKeyDone;
                break;
            case enums.ReturnKeyType.go:
                newReturnKeyType = UIReturnKeyType.UIReturnKeyGo;
                break;
            case enums.ReturnKeyType.next:
                newReturnKeyType = UIReturnKeyType.UIReturnKeyNext;
                break;
            case enums.ReturnKeyType.search:
                newReturnKeyType = UIReturnKeyType.UIReturnKeySearch;
                break;
            case enums.ReturnKeyType.send:
                newReturnKeyType = UIReturnKeyType.UIReturnKeySend;
                break;
            default:
                newReturnKeyType = UIReturnKeyType.UIReturnKeyDefault;
                break;
        }
        this.ios.returnKeyType = newReturnKeyType;
    };
    return EditableTextBase;
})(common.EditableTextBase);
exports.EditableTextBase = EditableTextBase;
