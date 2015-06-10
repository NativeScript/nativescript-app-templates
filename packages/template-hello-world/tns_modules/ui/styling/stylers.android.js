var types = require("utils/types");
var trace = require("trace");
var constants = require("utils/android_constants");
var style = require("ui/styling/style");
var stylersCommon = require("ui/styling/stylers-common");
var enums = require("ui/enums");
var utils = require("utils/utils");
require("utils/module-merge").merge(stylersCommon, exports);
var DefaultStyler = (function () {
    function DefaultStyler() {
    }
    DefaultStyler.setBackgroundProperty = function (view, newValue) {
        view.android.setBackgroundColor(newValue);
    };
    DefaultStyler.resetBackgroundProperty = function (view, nativeValue) {
        if (types.isDefined(nativeValue)) {
            view.android.setBackground(nativeValue);
        }
    };
    DefaultStyler.getNativeBackgroundValue = function (view) {
        var drawable = view.android.getBackground();
        if (drawable instanceof android.graphics.drawable.StateListDrawable) {
            trace.write("Native value of view: " + view + " is StateListDrawable. It will not be cached.", trace.categories.Style);
            return undefined;
        }
        return drawable;
    };
    DefaultStyler.setBackgroundImageSourceProperty = function (view, newValue) {
        var nativeView = view.android;
        var bmp = newValue;
        var d = new android.graphics.drawable.BitmapDrawable(bmp);
        d.setTileModeXY(android.graphics.Shader.TileMode.REPEAT, android.graphics.Shader.TileMode.REPEAT);
        d.setDither(true);
        nativeView.setBackgroundDrawable(d);
    };
    DefaultStyler.resetBackgroundImageSourceProperty = function (view, nativeValue) {
        if (types.isDefined(nativeValue)) {
            view.android.setBackgroundDrawable(nativeValue);
        }
    };
    DefaultStyler.getNativeBackgroundImageSourceValue = function (view) {
        var drawable = view.android.getBackground();
        if (drawable instanceof android.graphics.drawable.BitmapDrawable) {
            return drawable;
        }
        return undefined;
    };
    DefaultStyler.setVisibilityProperty = function (view, newValue) {
        var androidValue = (newValue === enums.Visibility.visible) ? android.view.View.VISIBLE : android.view.View.GONE;
        view.android.setVisibility(androidValue);
    };
    DefaultStyler.resetVisibilityProperty = function (view, nativeValue) {
        view.android.setVisibility(android.view.View.VISIBLE);
    };
    DefaultStyler.setOpacityProperty = function (view, newValue) {
        view.android.setAlpha(float(newValue));
    };
    DefaultStyler.resetOpacityProperty = function (view, nativeValue) {
        view.android.setAlpha(float(1.0));
    };
    DefaultStyler.setMinWidthProperty = function (view, newValue) {
        view._nativeView.setMinimumWidth(newValue * utils.layout.getDisplayDensity());
    };
    DefaultStyler.resetMinWidthProperty = function (view, nativeValue) {
        view._nativeView.setMinimumWidth(0);
    };
    DefaultStyler.setMinHeightProperty = function (view, newValue) {
        view._nativeView.setMinimumHeight(newValue * utils.layout.getDisplayDensity());
    };
    DefaultStyler.resetMinHeightProperty = function (view, nativeValue) {
        view._nativeView.setMinimumHeight(0);
    };
    DefaultStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundColorProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setBackgroundProperty, DefaultStyler.resetBackgroundProperty, DefaultStyler.getNativeBackgroundValue));
        style.registerHandler(style.backgroundImageSourceProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setBackgroundImageSourceProperty, DefaultStyler.resetBackgroundImageSourceProperty, DefaultStyler.getNativeBackgroundImageSourceValue));
        style.registerHandler(style.visibilityProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setVisibilityProperty, DefaultStyler.resetVisibilityProperty));
        style.registerHandler(style.opacityProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setOpacityProperty, DefaultStyler.resetOpacityProperty));
        style.registerHandler(style.minWidthProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setMinWidthProperty, DefaultStyler.resetMinWidthProperty));
        style.registerHandler(style.minHeightProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setMinHeightProperty, DefaultStyler.resetMinHeightProperty));
    };
    return DefaultStyler;
})();
exports.DefaultStyler = DefaultStyler;
var TextViewStyler = (function () {
    function TextViewStyler() {
    }
    TextViewStyler.setColorProperty = function (view, newValue) {
        view.android.setTextColor(newValue);
    };
    TextViewStyler.resetColorProperty = function (view, nativeValue) {
        view.android.setTextColor(nativeValue);
    };
    TextViewStyler.getNativeColorValue = function (view) {
        return view.android.getTextColors().getDefaultColor();
    };
    TextViewStyler.setFontSizeProperty = function (view, newValue) {
        view.android.setTextSize(newValue);
    };
    TextViewStyler.resetFontSizeProperty = function (view, nativeValue) {
        view.android.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, nativeValue);
    };
    TextViewStyler.getNativeFontSizeValue = function (view) {
        return view.android.getTextSize();
    };
    TextViewStyler.setTextAlignmentProperty = function (view, newValue) {
        var verticalGravity = view.android.getGravity() & android.view.Gravity.VERTICAL_GRAVITY_MASK;
        switch (newValue) {
            case enums.TextAlignment.left:
                view.android.setGravity(android.view.Gravity.LEFT | verticalGravity);
                break;
            case enums.TextAlignment.center:
                view.android.setGravity(android.view.Gravity.CENTER_HORIZONTAL | verticalGravity);
                break;
            case enums.TextAlignment.right:
                view.android.setGravity(android.view.Gravity.RIGHT | verticalGravity);
                break;
            default:
                break;
        }
    };
    TextViewStyler.resetTextAlignmentProperty = function (view, nativeValue) {
        view.android.setGravity(nativeValue);
    };
    TextViewStyler.getNativeTextAlignmentValue = function (view) {
        return view.android.getGravity();
    };
    TextViewStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new stylersCommon.StylePropertyChangedHandler(TextViewStyler.setColorProperty, TextViewStyler.resetColorProperty, TextViewStyler.getNativeColorValue));
        style.registerHandler(style.fontSizeProperty, new stylersCommon.StylePropertyChangedHandler(TextViewStyler.setFontSizeProperty, TextViewStyler.resetFontSizeProperty, TextViewStyler.getNativeFontSizeValue));
        style.registerHandler(style.textAlignmentProperty, new stylersCommon.StylePropertyChangedHandler(TextViewStyler.setTextAlignmentProperty, TextViewStyler.resetTextAlignmentProperty, TextViewStyler.getNativeTextAlignmentValue));
    };
    return TextViewStyler;
})();
exports.TextViewStyler = TextViewStyler;
var ButtonStyler = (function () {
    function ButtonStyler() {
    }
    ButtonStyler.setButtonBackgroundProperty = function (view, newValue) {
        view.android.setBackgroundColor(newValue);
    };
    ButtonStyler.resetButtonBackgroundProperty = function (view, nativeValue) {
        view.android.setBackgroundResource(constants.btn_default);
    };
    ButtonStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundColorProperty, new stylersCommon.StylePropertyChangedHandler(ButtonStyler.setButtonBackgroundProperty, ButtonStyler.resetButtonBackgroundProperty), "Button");
    };
    return ButtonStyler;
})();
exports.ButtonStyler = ButtonStyler;
var ActivityIndicatorStyler = (function () {
    function ActivityIndicatorStyler() {
    }
    ActivityIndicatorStyler.setActivityIndicatorVisibilityProperty = function (view, newValue) {
        ActivityIndicatorStyler.setIndicatorVisibility(view.busy, newValue, view.android);
    };
    ActivityIndicatorStyler.resetActivityIndicatorVisibilityProperty = function (view, nativeValue) {
        ActivityIndicatorStyler.setIndicatorVisibility(view.busy, enums.Visibility.visible, view.android);
    };
    ActivityIndicatorStyler.setIndicatorVisibility = function (isBusy, visibility, nativeView) {
        if (visibility === enums.Visibility.collapsed) {
            nativeView.setVisibility(android.view.View.GONE);
        }
        else {
            nativeView.setVisibility(isBusy ? android.view.View.VISIBLE : android.view.View.INVISIBLE);
        }
    };
    ActivityIndicatorStyler.registerHandlers = function () {
        style.registerHandler(style.visibilityProperty, new stylersCommon.StylePropertyChangedHandler(ActivityIndicatorStyler.setActivityIndicatorVisibilityProperty, ActivityIndicatorStyler.resetActivityIndicatorVisibilityProperty), "ActivityIndicator");
    };
    return ActivityIndicatorStyler;
})();
exports.ActivityIndicatorStyler = ActivityIndicatorStyler;
var SegmentedBarStyler = (function () {
    function SegmentedBarStyler() {
    }
    SegmentedBarStyler.setColorProperty = function (view, newValue) {
        var tabHost = view.android;
        for (var tabIndex = 0; tabIndex < tabHost.getTabWidget().getTabCount(); tabIndex++) {
            var tab = tabHost.getTabWidget().getChildTabViewAt(tabIndex);
            var t = tab.getChildAt(1);
            t.setTextColor(newValue);
        }
    };
    SegmentedBarStyler.resetColorProperty = function (view, nativeValue) {
        var tabHost = view.android;
        for (var tabIndex = 0; tabIndex < tabHost.getTabWidget().getTabCount(); tabIndex++) {
            var tab = tabHost.getTabWidget().getChildTabViewAt(tabIndex);
            var t = tab.getChildAt(1);
            t.setTextColor(constants.btn_default);
        }
    };
    SegmentedBarStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new stylersCommon.StylePropertyChangedHandler(SegmentedBarStyler.setColorProperty, SegmentedBarStyler.resetColorProperty), "SegmentedBar");
    };
    return SegmentedBarStyler;
})();
exports.SegmentedBarStyler = SegmentedBarStyler;
var SearchBarStyler = (function () {
    function SearchBarStyler() {
    }
    SearchBarStyler.getBackgroundColorProperty = function (view) {
        var bar = view.android;
        return bar.getDrawingCacheBackgroundColor();
    };
    SearchBarStyler.setBackgroundColorProperty = function (view, newValue) {
        var bar = view.android;
        bar.setBackgroundColor(newValue);
        SearchBarStyler._changeSearchViewPlateBackgroundColor(bar, newValue);
    };
    SearchBarStyler.resetBackgroundColorProperty = function (view, nativeValue) {
        var bar = view.android;
        bar.setBackgroundColor(nativeValue);
        SearchBarStyler._changeSearchViewPlateBackgroundColor(bar, nativeValue);
    };
    SearchBarStyler.getColorProperty = function (view) {
        var bar = view.android;
        var textView = SearchBarStyler._getSearchViewTextView(bar);
        if (textView) {
            return textView.getCurrentTextColor();
        }
        return undefined;
    };
    SearchBarStyler.setColorProperty = function (view, newValue) {
        var bar = view.android;
        SearchBarStyler._changeSearchViewTextColor(bar, newValue);
    };
    SearchBarStyler.resetColorProperty = function (view, nativeValue) {
        var bar = view.android;
        SearchBarStyler._changeSearchViewTextColor(bar, nativeValue);
    };
    SearchBarStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundColorProperty, new stylersCommon.StylePropertyChangedHandler(SearchBarStyler.setBackgroundColorProperty, SearchBarStyler.resetBackgroundColorProperty, SearchBarStyler.getBackgroundColorProperty), "SearchBar");
        style.registerHandler(style.colorProperty, new stylersCommon.StylePropertyChangedHandler(SearchBarStyler.setColorProperty, SearchBarStyler.resetColorProperty, SearchBarStyler.getColorProperty), "SearchBar");
    };
    SearchBarStyler._getSearchViewTextView = function (bar) {
        var id = bar.getContext().getResources().getIdentifier("android:id/search_src_text", null, null);
        return bar.findViewById(id);
    };
    SearchBarStyler._changeSearchViewTextColor = function (bar, color) {
        var textView = SearchBarStyler._getSearchViewTextView(bar);
        if (textView) {
            textView.setTextColor(color);
        }
    };
    SearchBarStyler._changeSearchViewPlateBackgroundColor = function (bar, color) {
        var id = bar.getContext().getResources().getIdentifier("android:id/search_plate", null, null);
        var textView = bar.findViewById(id);
        if (textView) {
            textView.setBackgroundColor(color);
        }
    };
    return SearchBarStyler;
})();
exports.SearchBarStyler = SearchBarStyler;
var BorderStyler = (function () {
    function BorderStyler() {
    }
    BorderStyler.setBackgroundProperty = function (view, newValue) {
        var border = view;
        border._updateAndroidBorder();
    };
    BorderStyler.resetBackgroundProperty = function (view, nativeValue) {
        var border = view;
        border._updateAndroidBorder();
    };
    BorderStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundColorProperty, new stylersCommon.StylePropertyChangedHandler(BorderStyler.setBackgroundProperty, BorderStyler.resetBackgroundProperty), "Border");
    };
    return BorderStyler;
})();
exports.BorderStyler = BorderStyler;
function _registerDefaultStylers() {
    style.registerNoStylingClass("Frame");
    DefaultStyler.registerHandlers();
    ButtonStyler.registerHandlers();
    TextViewStyler.registerHandlers();
    ActivityIndicatorStyler.registerHandlers();
    SegmentedBarStyler.registerHandlers();
    SearchBarStyler.registerHandlers();
    BorderStyler.registerHandlers();
}
exports._registerDefaultStylers = _registerDefaultStylers;
