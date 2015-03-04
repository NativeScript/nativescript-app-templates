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
    if (!view.android) {
        return;
    }
    var index = data.newValue;
    if (types.isNumber(index) && index >= 0 && index <= view.items.length - 1) {
        view.android.setCurrentTab(index);
    }
}
common.SegmentedBar.selectedIndexProperty.metadata.onSetNativeValue = onSelectedIndexPropertyChanged;
function onItemsPropertyChanged(data) {
    var view = data.object;
    if (!view.android) {
        return;
    }
    view.android.clearAllTabs();
    for (var i = 0; i < view.items.length; i++) {
        var title = view.items[i].title;
        var tab = view.android.newTabSpec(i + "");
        tab.setIndicator(title);
        tab.setContent(new android.widget.TabHost.TabContentFactory({
            createTabContent: function (tag) {
                var tv = new android.widget.TextView(view._context);
                tv.setVisibility(android.view.View.GONE);
                return tv;
            }
        }));
        view.android.addTab(tab);
    }
}
common.SegmentedBar.itemsProperty.metadata.onSetNativeValue = onItemsPropertyChanged;
var SegmentedBar = (function (_super) {
    __extends(SegmentedBar, _super);
    function SegmentedBar() {
        _super.apply(this, arguments);
    }
    SegmentedBar.prototype._createUI = function () {
        this._android = new OurTabHost(this._context, null);
        var that = new WeakRef(this);
        this._android.setOnTabChangedListener(new android.widget.TabHost.OnTabChangeListener({
            onTabChanged: function (id) {
                var bar = that.get();
                if (bar) {
                    bar.selectedIndex = parseInt(id);
                }
            }
        }));
        var tabHostLayout = new android.widget.LinearLayout(this._context);
        tabHostLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
        var tabWidget = new android.widget.TabWidget(this._context);
        tabWidget.setId(android.R.id.tabs);
        tabHostLayout.addView(tabWidget);
        var frame = new android.widget.FrameLayout(this._context);
        frame.setId(android.R.id.tabcontent);
        frame.setVisibility(android.view.View.GONE);
        tabHostLayout.addView(frame);
        this._android.addView(tabHostLayout);
        this._android.setup();
    };
    Object.defineProperty(SegmentedBar.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return SegmentedBar;
})(common.SegmentedBar);
exports.SegmentedBar = SegmentedBar;
var OurTabHost = (function (_super) {
    __extends(OurTabHost, _super);
    function OurTabHost(context, attrs) {
        _super.call(this, context, attrs);
        return global.__native(this);
    }
    OurTabHost.prototype.onAttachedToWindow = function () {
    };
    return OurTabHost;
})(android.widget.TabHost);
