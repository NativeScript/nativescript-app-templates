var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/search-bar/search-bar-common");
var SEARCHTEXT = "searchText";
var QUERY = "query";
var EMPTY = "";
function onTextPropertyChanged(data) {
    var bar = data.object;
    if (!bar.android) {
        return;
    }
    bar.android.setQuery(data.newValue, false);
}
common.textProperty.metadata.onSetNativeValue = onTextPropertyChanged;
require("utils/module-merge").merge(common, exports);
var SearchBar = (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar() {
        _super.apply(this, arguments);
    }
    SearchBar.prototype._createUI = function () {
        this._android = new android.widget.SearchView(this._context);
        var that = new WeakRef(this);
        this._android.setOnQueryTextListener(new android.widget.SearchView.OnQueryTextListener({
            get owner() {
                return that.get();
            },
            onQueryTextChange: function (newText) {
                if (this.owner) {
                    this.owner._onPropertyChangedFromNative(common.textProperty, newText);
                    if (newText === EMPTY && this[SEARCHTEXT] !== newText) {
                        this.owner._emit(common.knownEvents.clear);
                    }
                    this[SEARCHTEXT] = newText;
                }
                return true;
            },
            onQueryTextSubmit: function (query) {
                if (this.owner) {
                    if (query !== EMPTY && this[QUERY] !== query) {
                        this.owner._emit(common.knownEvents.submit);
                    }
                    this[QUERY] = query;
                }
                return true;
            }
        }));
        this._android.setOnCloseListener(new android.widget.SearchView.OnCloseListener({
            get owner() {
                return that.get();
            },
            onClose: function () {
                if (this.owner) {
                    this.owner._emit(common.knownEvents.clear);
                }
                return true;
            }
        }));
    };
    Object.defineProperty(SearchBar.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return SearchBar;
})(common.SearchBar);
exports.SearchBar = SearchBar;
