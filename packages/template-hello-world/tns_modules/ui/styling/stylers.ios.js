var style = require("ui/styling/style");
var stylersCommon = require("ui/styling/stylers-common");
var enums = require("ui/enums");
require("utils/module-merge").merge(stylersCommon, exports);
var DefaultStyler = (function () {
    function DefaultStyler() {
    }
    DefaultStyler.setBackgroundProperty = function (view, newValue) {
        var nativeView = view._nativeView;
        if (nativeView) {
            nativeView.backgroundColor = newValue;
        }
    };
    DefaultStyler.resetBackgroundProperty = function (view, nativeValue) {
        var nativeView = view._nativeView;
        if (nativeView) {
            nativeView.backgroundColor = nativeValue;
        }
    };
    DefaultStyler.getNativeBackgroundValue = function (view) {
        var nativeView = view._nativeView;
        if (nativeView) {
            return nativeView.backgroundColor;
        }
        return undefined;
    };
    DefaultStyler.setBackgroundImageSourceProperty = function (view, newValue) {
        var nativeView = view._nativeView;
        if (nativeView) {
            nativeView.backgroundColor = UIColor.alloc().initWithPatternImage(newValue);
        }
    };
    DefaultStyler.resetBackgroundImageSourceProperty = function (view, nativeValue) {
        var nativeView = view._nativeView;
        if (nativeView) {
            nativeView.backgroundColor = nativeValue;
        }
    };
    DefaultStyler.getNativeBackgroundImageSourceValue = function (view) {
        var nativeView = view._nativeView;
        if (nativeView) {
            return nativeView.backgroundColor;
        }
        return undefined;
    };
    DefaultStyler.setVisibilityProperty = function (view, newValue) {
        var nativeView = view._nativeView;
        if (nativeView) {
            return nativeView.hidden = (newValue !== enums.Visibility.visible);
        }
    };
    DefaultStyler.resetVisibilityProperty = function (view, nativeValue) {
        var nativeView = view._nativeView;
        if (nativeView) {
            return nativeView.hidden = false;
        }
    };
    DefaultStyler.setOpacityProperty = function (view, newValue) {
        var nativeView = view._nativeView;
        if (nativeView) {
            return nativeView.alpha = newValue;
        }
    };
    DefaultStyler.resetOpacityProperty = function (view, nativeValue) {
        var nativeView = view._nativeView;
        if (nativeView) {
            return nativeView.alpha = 1.0;
        }
    };
    DefaultStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundColorProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setBackgroundProperty, DefaultStyler.resetBackgroundProperty, DefaultStyler.getNativeBackgroundValue));
        style.registerHandler(style.backgroundImageSourceProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setBackgroundImageSourceProperty, DefaultStyler.resetBackgroundImageSourceProperty, DefaultStyler.getNativeBackgroundImageSourceValue));
        style.registerHandler(style.visibilityProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setVisibilityProperty, DefaultStyler.resetVisibilityProperty));
        style.registerHandler(style.opacityProperty, new stylersCommon.StylePropertyChangedHandler(DefaultStyler.setOpacityProperty, DefaultStyler.resetOpacityProperty));
    };
    return DefaultStyler;
})();
exports.DefaultStyler = DefaultStyler;
var ButtonStyler = (function () {
    function ButtonStyler() {
    }
    ButtonStyler.setColorProperty = function (view, newValue) {
        var btn = view._nativeView;
        if (btn) {
            btn.setTitleColorForState(newValue, UIControlState.UIControlStateNormal);
        }
    };
    ButtonStyler.resetColorProperty = function (view, nativeValue) {
        var btn = view._nativeView;
        if (btn) {
            btn.setTitleColorForState(nativeValue, UIControlState.UIControlStateNormal);
        }
    };
    ButtonStyler.getNativeColorValue = function (view) {
        var btn = view._nativeView;
        if (btn) {
            return btn.titleColorForState(UIControlState.UIControlStateNormal);
        }
    };
    ButtonStyler.setFontSizeProperty = function (view, newValue) {
        var btn = view._nativeView;
        if (btn) {
            btn.titleLabel.font = btn.titleLabel.font.fontWithSize(newValue);
        }
    };
    ButtonStyler.resetFontSizeProperty = function (view, nativeValue) {
        var btn = view._nativeView;
        if (btn) {
            btn.font = btn.titleLabel.font.fontWithSize(nativeValue);
        }
    };
    ButtonStyler.getNativeFontSizeValue = function (view) {
        var btn = view._nativeView;
        if (btn) {
            return btn.titleLabel.font.pointSize;
        }
    };
    ButtonStyler.setTextAlignmentProperty = function (view, newValue) {
        var ios = view._nativeView;
        if (ios) {
            switch (newValue) {
                case enums.TextAlignment.left:
                    ios.titleLabel.textAlignment = NSTextAlignment.NSTextAlignmentLeft;
                    ios.contentHorizontalAlignment = UIControlContentHorizontalAlignment.UIControlContentHorizontalAlignmentLeft;
                    break;
                case enums.TextAlignment.center:
                    ios.titleLabel.textAlignment = NSTextAlignment.NSTextAlignmentCenter;
                    ios.contentHorizontalAlignment = UIControlContentHorizontalAlignment.UIControlContentHorizontalAlignmentCenter;
                    break;
                case enums.TextAlignment.right:
                    ios.titleLabel.textAlignment = NSTextAlignment.NSTextAlignmentRight;
                    ios.contentHorizontalAlignment = UIControlContentHorizontalAlignment.UIControlContentHorizontalAlignmentRight;
                    break;
                default:
                    break;
            }
        }
    };
    ButtonStyler.resetTextAlignmentProperty = function (view, nativeValue) {
        var ios = view._nativeView;
        if (ios) {
            ios.titleLabel.textAlignment = nativeValue.textAlign;
            ios.contentHorizontalAlignment = nativeValue.contentAlign;
        }
    };
    ButtonStyler.getNativeTextAlignmentValue = function (view) {
        var ios = view._nativeView;
        if (ios) {
            return {
                textAlign: ios.titleLabel.textAlignment,
                contentAlign: ios.contentHorizontalAlignment
            };
        }
    };
    ButtonStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new stylersCommon.StylePropertyChangedHandler(ButtonStyler.setColorProperty, ButtonStyler.resetColorProperty, ButtonStyler.getNativeColorValue), "Button");
        style.registerHandler(style.fontSizeProperty, new stylersCommon.StylePropertyChangedHandler(ButtonStyler.setFontSizeProperty, ButtonStyler.resetFontSizeProperty, ButtonStyler.getNativeFontSizeValue), "Button");
        style.registerHandler(style.textAlignmentProperty, new stylersCommon.StylePropertyChangedHandler(ButtonStyler.setTextAlignmentProperty, ButtonStyler.resetTextAlignmentProperty, ButtonStyler.getNativeTextAlignmentValue), "Button");
    };
    return ButtonStyler;
})();
exports.ButtonStyler = ButtonStyler;
var LabelStyler = (function () {
    function LabelStyler() {
    }
    LabelStyler.setColorProperty = function (view, newValue) {
        var label = view._nativeView;
        if (label) {
            label.textColor = newValue;
        }
    };
    LabelStyler.resetColorProperty = function (view, nativeValue) {
        var label = view._nativeView;
        if (label) {
            label.textColor = nativeValue;
        }
    };
    LabelStyler.getNativeColorValue = function (view) {
        var label = view._nativeView;
        if (label) {
            return label.textColor;
        }
    };
    LabelStyler.setFontSizeProperty = function (view, newValue) {
        var label = view._nativeView;
        if (label) {
            label.font = label.font.fontWithSize(newValue);
        }
    };
    LabelStyler.resetFontSizeProperty = function (view, nativeValue) {
        var label = view._nativeView;
        if (label) {
            label.font = label.font.fontWithSize(nativeValue);
        }
    };
    LabelStyler.getNativeFontSizeValue = function (view) {
        var label = view._nativeView;
        if (label) {
            return label.font.pointSize;
        }
    };
    LabelStyler.setTextAlignmentProperty = function (view, newValue) {
        var ios = view._nativeView;
        if (ios) {
            switch (newValue) {
                case enums.TextAlignment.left:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentLeft;
                    break;
                case enums.TextAlignment.center:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentCenter;
                    break;
                case enums.TextAlignment.right:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentRight;
                    break;
                default:
                    break;
            }
        }
    };
    LabelStyler.resetTextAlignmentProperty = function (view, nativeValue) {
        var ios = view._nativeView;
        if (ios) {
            ios.textAlignment = nativeValue;
        }
    };
    LabelStyler.getNativeTextAlignmentValue = function (view) {
        var ios = view._nativeView;
        if (ios) {
            return ios.textAlignment;
        }
    };
    LabelStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new stylersCommon.StylePropertyChangedHandler(LabelStyler.setColorProperty, LabelStyler.resetColorProperty, LabelStyler.getNativeColorValue), "Label");
        style.registerHandler(style.fontSizeProperty, new stylersCommon.StylePropertyChangedHandler(LabelStyler.setFontSizeProperty, LabelStyler.resetFontSizeProperty, LabelStyler.getNativeFontSizeValue), "Label");
        style.registerHandler(style.textAlignmentProperty, new stylersCommon.StylePropertyChangedHandler(LabelStyler.setTextAlignmentProperty, LabelStyler.resetTextAlignmentProperty, LabelStyler.getNativeTextAlignmentValue), "Label");
    };
    return LabelStyler;
})();
exports.LabelStyler = LabelStyler;
var TextFieldStyler = (function () {
    function TextFieldStyler() {
    }
    TextFieldStyler.setColorProperty = function (view, newValue) {
        var textField = view._nativeView;
        if (textField) {
            textField.textColor = newValue;
        }
    };
    TextFieldStyler.resetColorProperty = function (view, nativeValue) {
        var textField = view._nativeView;
        if (textField) {
            textField.textColor = nativeValue;
        }
    };
    TextFieldStyler.getNativeColorValue = function (view) {
        var textField = view._nativeView;
        if (textField) {
            return textField.textColor;
        }
    };
    TextFieldStyler.setFontSizeProperty = function (view, newValue) {
        var textField = view._nativeView;
        if (textField) {
            textField.font = textField.font.fontWithSize(newValue);
        }
    };
    TextFieldStyler.resetFontSizeProperty = function (view, nativeValue) {
        var textField = view._nativeView;
        if (textField) {
            textField.font = textField.font.fontWithSize(nativeValue);
        }
    };
    TextFieldStyler.getNativeFontSizeValue = function (view) {
        var textField = view._nativeView;
        if (textField) {
            return textField.font.pointSize;
        }
    };
    TextFieldStyler.setTextAlignmentProperty = function (view, newValue) {
        var ios = view._nativeView;
        if (ios) {
            switch (newValue) {
                case enums.TextAlignment.left:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentLeft;
                    break;
                case enums.TextAlignment.center:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentCenter;
                    break;
                case enums.TextAlignment.right:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentRight;
                    break;
                default:
                    break;
            }
        }
    };
    TextFieldStyler.resetTextAlignmentProperty = function (view, nativeValue) {
        var ios = view._nativeView;
        if (ios) {
            ios.textAlignment = nativeValue;
        }
    };
    TextFieldStyler.getNativeTextAlignmentValue = function (view) {
        var ios = view._nativeView;
        if (ios) {
            return ios.textAlignment;
        }
    };
    TextFieldStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new stylersCommon.StylePropertyChangedHandler(TextFieldStyler.setColorProperty, TextFieldStyler.resetColorProperty, TextFieldStyler.getNativeColorValue), "TextField");
        style.registerHandler(style.fontSizeProperty, new stylersCommon.StylePropertyChangedHandler(TextFieldStyler.setFontSizeProperty, TextFieldStyler.resetFontSizeProperty, TextFieldStyler.getNativeFontSizeValue), "TextField");
        style.registerHandler(style.textAlignmentProperty, new stylersCommon.StylePropertyChangedHandler(TextFieldStyler.setTextAlignmentProperty, TextFieldStyler.resetTextAlignmentProperty, TextFieldStyler.getNativeTextAlignmentValue), "TextField");
    };
    return TextFieldStyler;
})();
exports.TextFieldStyler = TextFieldStyler;
var TextViewStyler = (function () {
    function TextViewStyler() {
    }
    TextViewStyler.setColorProperty = function (view, newValue) {
        var textView = view._nativeView;
        if (textView) {
            textView.textColor = newValue;
        }
    };
    TextViewStyler.resetColorProperty = function (view, nativeValue) {
        var textView = view._nativeView;
        if (textView) {
            textView.textColor = nativeValue;
        }
    };
    TextViewStyler.getNativeColorValue = function (view) {
        var textView = view._nativeView;
        if (textView) {
            return textView.textColor;
        }
    };
    TextViewStyler.setFontSizeProperty = function (view, newValue) {
        var textView = view._nativeView;
        if (textView) {
            textView.font = textView.font.fontWithSize(newValue);
        }
    };
    TextViewStyler.resetFontSizeProperty = function (view, nativeValue) {
        var textView = view._nativeView;
        if (textView) {
            textView.font = textView.font.fontWithSize(nativeValue);
        }
    };
    TextViewStyler.getNativeFontSizeValue = function (view) {
        var textView = view._nativeView;
        if (textView) {
            return textView.font.pointSize;
        }
    };
    TextViewStyler.setTextAlignmentProperty = function (view, newValue) {
        var ios = view._nativeView;
        if (ios) {
            switch (newValue) {
                case enums.TextAlignment.left:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentLeft;
                    break;
                case enums.TextAlignment.center:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentCenter;
                    break;
                case enums.TextAlignment.right:
                    ios.textAlignment = NSTextAlignment.NSTextAlignmentRight;
                    break;
                default:
                    break;
            }
        }
    };
    TextViewStyler.resetTextAlignmentProperty = function (view, nativeValue) {
        var ios = view._nativeView;
        if (ios) {
            ios.textAlignment = nativeValue;
        }
    };
    TextViewStyler.getNativeTextAlignmentValue = function (view) {
        var ios = view._nativeView;
        if (ios) {
            return ios.textAlignment;
        }
    };
    TextViewStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new stylersCommon.StylePropertyChangedHandler(TextViewStyler.setColorProperty, TextViewStyler.resetColorProperty, TextViewStyler.getNativeColorValue), "TextView");
        style.registerHandler(style.fontSizeProperty, new stylersCommon.StylePropertyChangedHandler(TextViewStyler.setFontSizeProperty, TextViewStyler.resetFontSizeProperty, TextViewStyler.getNativeFontSizeValue), "TextView");
        style.registerHandler(style.textAlignmentProperty, new stylersCommon.StylePropertyChangedHandler(TextViewStyler.setTextAlignmentProperty, TextViewStyler.resetTextAlignmentProperty, TextViewStyler.getNativeTextAlignmentValue), "TextView");
    };
    return TextViewStyler;
})();
exports.TextViewStyler = TextViewStyler;
var SegmentedBarStyler = (function () {
    function SegmentedBarStyler() {
    }
    SegmentedBarStyler.setColorProperty = function (view, newValue) {
        var bar = view.ios;
        var attrs = NSMutableDictionary.new();
        attrs.setValueForKey(newValue, NSForegroundColorAttributeName);
        bar.setTitleTextAttributesForState(attrs, UIControlState.UIControlStateNormal);
    };
    SegmentedBarStyler.resetColorProperty = function (view, nativeValue) {
        var bar = view.ios;
        var attrs = NSMutableDictionary.new();
        attrs.setValueForKey(nativeValue, NSForegroundColorAttributeName);
        bar.setTitleTextAttributesForState(attrs, UIControlState.UIControlStateNormal);
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
    SearchBarStyler.setBackgroundColorProperty = function (view, newValue) {
        var bar = view.ios;
        bar.barTintColor = newValue;
    };
    SearchBarStyler.getBackgroundColorProperty = function (view) {
        var bar = view.ios;
        return bar.barTintColor;
    };
    SearchBarStyler.resetBackgroundColorProperty = function (view, nativeValue) {
        var bar = view.ios;
        bar.barTintColor = nativeValue;
    };
    SearchBarStyler.getColorProperty = function (view) {
        var bar = view.ios;
        var sf = bar.valueForKey("_searchField");
        if (sf) {
            return sf.textColor;
        }
        return undefined;
    };
    SearchBarStyler.setColorProperty = function (view, newValue) {
        var bar = view.ios;
        var sf = bar.valueForKey("_searchField");
        if (sf) {
            sf.textColor = newValue;
        }
    };
    SearchBarStyler.resetColorProperty = function (view, nativeValue) {
        var bar = view.ios;
        var sf = bar.valueForKey("_searchField");
        if (sf) {
            sf.textColor = nativeValue;
        }
    };
    SearchBarStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundColorProperty, new stylersCommon.StylePropertyChangedHandler(SearchBarStyler.setBackgroundColorProperty, SearchBarStyler.resetBackgroundColorProperty, SearchBarStyler.getBackgroundColorProperty), "SearchBar");
        style.registerHandler(style.colorProperty, new stylersCommon.StylePropertyChangedHandler(SearchBarStyler.setColorProperty, SearchBarStyler.resetColorProperty, SearchBarStyler.getColorProperty), "SearchBar");
    };
    return SearchBarStyler;
})();
exports.SearchBarStyler = SearchBarStyler;
function _registerDefaultStylers() {
    style.registerNoStylingClass("Frame");
    DefaultStyler.registerHandlers();
    ButtonStyler.registerHandlers();
    LabelStyler.registerHandlers();
    TextFieldStyler.registerHandlers();
    TextViewStyler.registerHandlers();
    SegmentedBarStyler.registerHandlers();
    SearchBarStyler.registerHandlers();
}
exports._registerDefaultStylers = _registerDefaultStylers;
