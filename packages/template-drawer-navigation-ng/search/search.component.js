"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var sidedrawer_1 = require("nativescript-telerik-ui/sidedrawer");
var SearchComponent = (function () {
    function SearchComponent() {
        this.sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent.prototype.openDrawer = function () {
        this.drawerComponent.sideDrawer.toggleDrawerState();
    };
    return SearchComponent;
}());
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], SearchComponent.prototype, "drawerComponent", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: "Search",
        moduleId: module.id,
        templateUrl: "./search.component.html",
    }),
    __metadata("design:paramtypes", [])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0Qsc0VBQW9GO0FBQ3BGLGlFQUFrRztBQU9sRyxJQUFhLGVBQWU7SUFLeEI7UUFDSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxtQ0FBc0IsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFRCxrQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFid0I7SUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OEJBQXlCLGdDQUFzQjt3REFBQztBQUgzRCxlQUFlO0lBTDNCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtLQUN6QyxDQUFDOztHQUNXLGVBQWUsQ0FnQjNCO0FBaEJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiU2VhcmNoXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZWFyY2guY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkRyYXdlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnRvZ2dsZURyYXdlclN0YXRlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19