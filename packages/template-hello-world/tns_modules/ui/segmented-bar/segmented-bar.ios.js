var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/segmented-bar/segmented-bar-common");
var types = require("utils/types");
require("utils/module-merge").merge(common, exports);
function onSelectedIndexPropertyChanged(data) {
    var view = data.object;
    if (!view.ios) {
        return;
    }
    var index = data.newValue;
    if (types.isNumber(index) && index >= 0 && index <= view.items.length - 1) {
        view.ios.selectedSegmentIndex = index;
    }
}
common.SegmentedBar.selectedIndexProperty.metadata.onSetNativeValue = onSelectedIndexPropertyChanged;
function onItemsPropertyChanged(data) {
    var view = data.object;
    if (!view.ios) {
        return;
    }
    view.ios.removeAllSegments();
    for (var i = 0; i < view.items.length; i++) {
        view.ios.insertSegmentWithTitleAtIndexAnimated(view.items[i].title, i, false);
    }
}
common.SegmentedBar.itemsProperty.metadata.onSetNativeValue = onItemsPropertyChanged;
var SegmentedBar = (function (_super) {
    __extends(SegmentedBar, _super);
    function SegmentedBar() {
        _super.call(this);
        this._ios = UISegmentedControl.new();
        this._selectionHandler = SelectionHandlerImpl.new().initWithOwner(this);
        this._ios.addTargetActionForControlEvents(this._selectionHandler, "selected", UIControlEvents.UIControlEventValueChanged);
    }
    Object.defineProperty(SegmentedBar.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return SegmentedBar;
})(common.SegmentedBar);
exports.SegmentedBar = SegmentedBar;
var SelectionHandlerImpl = (function (_super) {
    __extends(SelectionHandlerImpl, _super);
    function SelectionHandlerImpl() {
        _super.apply(this, arguments);
    }
    SelectionHandlerImpl.new = function () {
        return _super.new.call(this);
    };
    SelectionHandlerImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    SelectionHandlerImpl.prototype.selected = function (sender) {
        this._owner.selectedIndex = sender.selectedSegmentIndex;
    };
    SelectionHandlerImpl.ObjCExposedMethods = {
        "selected": { returns: interop.types.void, params: [UISegmentedControl] }
    };
    return SelectionHandlerImpl;
})(NSObject);
