var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/text-view/text-view-common");
var textBase = require("ui/text-base");
var enums = require("ui/enums");
require("utils/module-merge").merge(common, exports);
var UITextViewDelegateImpl = (function (_super) {
    __extends(UITextViewDelegateImpl, _super);
    function UITextViewDelegateImpl() {
        _super.apply(this, arguments);
    }
    UITextViewDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    UITextViewDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    UITextViewDelegateImpl.prototype.textViewDidEndEditing = function (textView) {
        if (this._owner.updateTextTrigger === enums.UpdateTextTrigger.focusLost) {
            this._owner._onPropertyChangedFromNative(textBase.TextBase.textProperty, textView.text);
        }
        this._owner.dismissSoftInput();
    };
    UITextViewDelegateImpl.prototype.textViewDidChange = function (textView) {
        if (this._owner.updateTextTrigger === enums.UpdateTextTrigger.textChanged) {
            this._owner._onPropertyChangedFromNative(textBase.TextBase.textProperty, textView.text);
        }
    };
    UITextViewDelegateImpl.ObjCProtocols = [UITextViewDelegate];
    return UITextViewDelegateImpl;
})(NSObject);
var TextView = (function (_super) {
    __extends(TextView, _super);
    function TextView() {
        _super.call(this);
        this._ios = UITextView.new();
        if (!this._ios.font) {
            this._ios.font = UIFont.systemFontOfSize(12);
        }
        this._delegate = UITextViewDelegateImpl.new().initWithOwner(this);
    }
    TextView.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._delegate;
    };
    TextView.prototype.onUnloaded = function () {
        this._ios.delegate = null;
        _super.prototype.onUnloaded.call(this);
    };
    Object.defineProperty(TextView.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    TextView.prototype._onEditablePropertyChanged = function (data) {
        this._ios.editable = data.newValue;
    };
    return TextView;
})(common.TextView);
exports.TextView = TextView;
