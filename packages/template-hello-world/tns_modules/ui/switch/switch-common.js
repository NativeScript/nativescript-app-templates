var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
exports.checkedProperty = new dependencyObservable.Property("checked", "Switch", new proxy.PropertyMetadata(false));
var Switch = (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Switch.prototype, "checked", {
        get: function () {
            return this._getValue(exports.checkedProperty);
        },
        set: function (value) {
            this._setValue(exports.checkedProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    return Switch;
})(view.View);
exports.Switch = Switch;
