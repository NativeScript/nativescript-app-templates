var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var contentView = require("ui/content-view");
var view = require("ui/core/view");
var styleScope = require("ui/styling/style-scope");
var fs = require("file-system");
var fileSystemAccess = require("file-system/file-system-access");
var bindable = require("ui/core/bindable");
var dependencyObservable = require("ui/core/dependency-observable");
var enums = require("ui/enums");
var OPTIONS_MENU = "optionsMenu";
var knownCollections;
(function (knownCollections) {
    knownCollections.optionsMenu = "optionsMenu";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(options) {
        _super.call(this, options);
        this._styleScope = new styleScope.StyleScope();
        this._optionsMenu = new OptionsMenu(this);
    }
    Page.prototype.onLoaded = function () {
        this._applyCss();
        _super.prototype.onLoaded.call(this);
    };
    Object.defineProperty(Page.prototype, "navigationContext", {
        get: function () {
            return this._navigationContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "css", {
        get: function () {
            if (this._styleScope) {
                return this._styleScope.css;
            }
            return undefined;
        },
        set: function (value) {
            this._styleScope.css = value;
            this._refreshCss();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "optionsMenu", {
        get: function () {
            return this._optionsMenu;
        },
        set: function (value) {
            throw new Error("optionsMenu property is read-only");
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype._refreshCss = function () {
        if (this._cssApplied) {
            this._resetCssValues();
        }
        this._cssApplied = false;
        if (this.isLoaded) {
            this._applyCss();
        }
    };
    Page.prototype.addCss = function (cssString) {
        this._addCssInternal(cssString, undefined);
    };
    Page.prototype._addCssInternal = function (cssString, cssFileName) {
        this._styleScope.addCss(cssString, cssFileName);
        this._refreshCss();
    };
    Page.prototype.addCssFile = function (cssFileName) {
        if (cssFileName.indexOf(fs.knownFolders.currentApp().path) !== 0) {
            cssFileName = fs.path.join(fs.knownFolders.currentApp().path, cssFileName);
        }
        var cssString;
        if (fs.File.exists(cssFileName)) {
            new fileSystemAccess.FileSystemAccess().readText(cssFileName, function (r) {
                cssString = r;
            });
            this._addCssInternal(cssString, cssFileName);
        }
    };
    Object.defineProperty(Page.prototype, "frame", {
        get: function () {
            return this.parent;
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.onNavigatingTo = function (context) {
        this._navigationContext = context;
    };
    Page.prototype.onNavigatedTo = function (context) {
        this._navigationContext = context;
        this.notify({
            eventName: Page.navigatedToEvent,
            object: this,
            context: context
        });
    };
    Page.prototype.onNavigatingFrom = function () {
    };
    Page.prototype.onNavigatedFrom = function (isBackNavigation) {
        this._navigationContext = undefined;
    };
    Page.prototype._getStyleScope = function () {
        return this._styleScope;
    };
    Page.prototype._applyCss = function () {
        if (this._cssApplied) {
            return;
        }
        this._styleScope.ensureSelectors();
        var scope = this._styleScope;
        var checkSelectors = function (view) {
            scope.applySelectors(view);
            return true;
        };
        checkSelectors(this);
        view.eachDescendant(this, checkSelectors);
        this._cssApplied = true;
    };
    Page.prototype._resetCssValues = function () {
        var resetCssValuesFunc = function (view) {
            view.style._resetCssValues();
            return true;
        };
        resetCssValuesFunc(this);
        view.eachDescendant(this, resetCssValuesFunc);
    };
    Page.prototype._addArrayFromBuilder = function (name, value) {
        if (name === OPTIONS_MENU) {
            this.optionsMenu.setItems(value);
        }
    };
    Page.navigatedToEvent = "navigatedTo";
    return Page;
})(contentView.ContentView);
exports.Page = Page;
var OptionsMenu = (function () {
    function OptionsMenu(page) {
        this._items = new Array();
        this._page = page;
    }
    OptionsMenu.prototype.addItem = function (item) {
        if (!item) {
            throw new Error("Cannot add empty item");
        }
        this._items.push(item);
        item.menu = this;
        item.bind({
            sourceProperty: "bindingContext",
            targetProperty: "bindingContext"
        }, this._page);
        this.invalidate();
    };
    OptionsMenu.prototype.removeItem = function (item) {
        if (!item) {
            throw new Error("Cannot remove empty item");
        }
        var itemIndex = this._items.indexOf(item);
        if (itemIndex < 0) {
            throw new Error("Cannot find item to remove");
        }
        item.menu = undefined;
        item.unbind("bindingContext");
        this._items.splice(itemIndex, 1);
        this.invalidate();
    };
    OptionsMenu.prototype.getItems = function () {
        return this._items.slice();
    };
    OptionsMenu.prototype.getItemAt = function (index) {
        return this._items[index];
    };
    OptionsMenu.prototype.setItems = function (items) {
        while (this._items.length > 0) {
            this.removeItem(this._items[this._items.length - 1]);
        }
        for (var i = 0; i < items.length; i++) {
            this.addItem(items[i]);
        }
        this.invalidate();
    };
    OptionsMenu.prototype.invalidate = function () {
        if (this._page.frame) {
            this._page.frame._invalidateOptionsMenu();
        }
    };
    return OptionsMenu;
})();
exports.OptionsMenu = OptionsMenu;
var MenuItem = (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        _super.call(this);
        if (global.android) {
            this._android = {
                position: enums.MenuItemPosition.actionBar
            };
        }
    }
    MenuItem.onItemChanged = function (data) {
        var menuItem = data.object;
        if (menuItem.menu) {
            menuItem.menu.invalidate();
        }
    };
    Object.defineProperty(MenuItem.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "text", {
        get: function () {
            return this._getValue(MenuItem.textProperty);
        },
        set: function (value) {
            this._setValue(MenuItem.textProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "icon", {
        get: function () {
            return this._getValue(MenuItem.iconProperty);
        },
        set: function (value) {
            this._setValue(MenuItem.iconProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MenuItem.prototype._raiseTap = function () {
        this._emit(MenuItem.tapEvent);
    };
    MenuItem.tapEvent = "tap";
    MenuItem.textProperty = new dependencyObservable.Property("text", "MenuItem", new dependencyObservable.PropertyMetadata("", null, MenuItem.onItemChanged));
    MenuItem.iconProperty = new dependencyObservable.Property("icon", "MenuItem", new dependencyObservable.PropertyMetadata(null, null, MenuItem.onItemChanged));
    return MenuItem;
})(bindable.Bindable);
exports.MenuItem = MenuItem;
