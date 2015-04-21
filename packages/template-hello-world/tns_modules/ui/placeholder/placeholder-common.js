var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var knownEvents;
(function (knownEvents) {
    knownEvents.creatingView = "creatingView";
})(knownEvents = exports.knownEvents || (exports.knownEvents = {}));
var Placeholder = (function (_super) {
    __extends(Placeholder, _super);
    function Placeholder() {
        _super.apply(this, arguments);
    }
    return Placeholder;
})(view.View);
exports.Placeholder = Placeholder;
