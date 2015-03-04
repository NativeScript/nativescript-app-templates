var trace = require("trace");
var visualState = require("ui/styling/visual-state");
var cssSelector = require("ui/styling/css-selector");
var cssParser = require("js-libs/reworkcss");
var VisualState = visualState.VisualState;
var application = require("application");
var StyleScope = (function () {
    function StyleScope() {
        this._statesByKey = {};
        this._viewIdToKey = {};
    }
    Object.defineProperty(StyleScope.prototype, "css", {
        get: function () {
            return this._css;
        },
        set: function (value) {
            this._css = value;
            this._cssSelectors = undefined;
            this._reset();
        },
        enumerable: true,
        configurable: true
    });
    StyleScope.prototype.addCss = function (cssString) {
        if (this._css === undefined) {
            this._css = cssString;
        }
        else {
            this._css += cssString;
        }
        this._reset();
        if (this._cssSelectors) {
            var addedCssTree = cssParser.parse(cssString, undefined);
            var addedSelectors = StyleScope.createSelectorsFromSyntaxTree(addedCssTree);
            this._cssSelectors = this._joinCssSelectorsArrays([this._cssSelectors, addedSelectors]);
        }
    };
    StyleScope.prototype.ensureSelectors = function () {
        if (!this._cssSelectors && (this._css || application.cssSelectorsCache)) {
            var applicationCssSelectors = application.cssSelectorsCache ? application.cssSelectorsCache : null;
            var pageCssSyntaxTree = this._css ? cssParser.parse(this._css, undefined) : null;
            var pageCssSelectors;
            if (pageCssSyntaxTree) {
                pageCssSelectors = StyleScope.createSelectorsFromSyntaxTree(pageCssSyntaxTree);
            }
            this._cssSelectors = this._joinCssSelectorsArrays([applicationCssSelectors, pageCssSelectors]);
        }
    };
    StyleScope.prototype._joinCssSelectorsArrays = function (arrays) {
        var mergedResult = [];
        var i;
        for (i = 0; i < arrays.length; i++) {
            if (arrays[i]) {
                mergedResult.push.apply(mergedResult, arrays[i]);
            }
        }
        mergedResult.sort(function (a, b) { return a.specificity - b.specificity; });
        return mergedResult;
    };
    StyleScope.prototype.applySelectors = function (view) {
        if (!this._cssSelectors) {
            return;
        }
        var i, selector, matchedStateSelectors = new Array();
        for (i = 0; i < this._cssSelectors.length; i++) {
            selector = this._cssSelectors[i];
            if (selector.matches(view)) {
                if (selector instanceof cssSelector.CssVisualStateSelector) {
                    matchedStateSelectors.push(selector);
                }
                else {
                    selector.apply(view);
                }
            }
        }
        if (matchedStateSelectors.length > 0) {
            var key = "";
            matchedStateSelectors.forEach(function (s) { return key += s.key + "|"; });
            this._viewIdToKey[view._domId] = key;
            if (!this._statesByKey[key]) {
                this._createVisualsStatesForSelectors(key, matchedStateSelectors);
            }
        }
    };
    StyleScope.prototype.getVisualStates = function (view) {
        var key = this._viewIdToKey[view._domId];
        if (key === undefined) {
            return undefined;
        }
        return this._statesByKey[key];
    };
    StyleScope.prototype._createVisualsStatesForSelectors = function (key, matchedStateSelectors) {
        var i, allStates = {}, stateSelector;
        this._statesByKey[key] = allStates;
        for (i = 0; i < matchedStateSelectors.length; i++) {
            stateSelector = matchedStateSelectors[i];
            var visualState = allStates[stateSelector.state];
            if (!visualState) {
                visualState = new VisualState();
                allStates[stateSelector.state] = visualState;
            }
            stateSelector.eachSetter(function (property, value) {
                visualState.setters[property.name] = value;
            });
        }
    };
    StyleScope.createSelectorsFromSyntaxTree = function (ast) {
        var result = [];
        var rules = ast.stylesheet.rules;
        var rule;
        var filteredDeclarations;
        var i;
        var j;
        for (i = 0; i < rules.length; i++) {
            rule = rules[i];
            if (rule.type === "rule") {
                filteredDeclarations = rule.declarations.filter(function (val, i, arr) {
                    return val.type === "declaration";
                });
                for (j = 0; j < rule.selectors.length; j++) {
                    result.push(cssSelector.createSelector(rule.selectors[j], filteredDeclarations));
                }
            }
        }
        return result;
    };
    StyleScope.prototype._reset = function () {
        this._statesByKey = {};
        this._viewIdToKey = {};
    };
    return StyleScope;
})();
exports.StyleScope = StyleScope;
function applyInlineSyle(view, style) {
    try {
        var syntaxTree = cssParser.parse("local { " + style + " }", undefined);
        var filteredDeclarations = syntaxTree.stylesheet.rules[0].declarations.filter(function (val, i, arr) {
            return val.type === "declaration";
        });
        cssSelector.applyInlineSyle(view, filteredDeclarations);
    }
    catch (ex) {
        trace.write("Applying local style failed: " + ex, trace.categories.Style);
    }
}
exports.applyInlineSyle = applyInlineSyle;
