var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var AppComponent = (function () {
    function AppComponent() {
        this.message = "Hello, Angular!";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n<StackLayout orientation=\"vertical\">\n    <Label [text]=\"message\" class=\"title\" (tap)=\"message = 'OHAI'\"></Label>\n</StackLayout>\n",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOlsiQXBwQ29tcG9uZW50IiwiQXBwQ29tcG9uZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFFeEM7SUFBQUE7UUFTV0MsWUFBT0EsR0FBV0EsaUJBQWlCQSxDQUFDQTtJQUMvQ0EsQ0FBQ0E7SUFWREQ7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1BBLFFBQVFBLEVBQUVBLFFBQVFBO1lBQ2xCQSxRQUFRQSxFQUFFQSwrSUFJYkE7U0FDQUEsQ0FBQ0E7O3FCQUdEQTtJQUFEQSxtQkFBQ0E7QUFBREEsQ0FBQ0EsQUFWRCxJQVVDO0FBRlksb0JBQVksZUFFeEIsQ0FBQSJ9