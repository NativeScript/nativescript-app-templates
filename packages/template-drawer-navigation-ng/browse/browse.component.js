"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var BrowseComponent = (function () {
    function BrowseComponent() {
    }
    BrowseComponent.prototype.ngOnInit = function () {
    };
    BrowseComponent.prototype.openDrawer = function () {
        this.drawerComponent.sideDrawer.toggleDrawerState();
    };
    return BrowseComponent;
}());
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], BrowseComponent.prototype, "drawerComponent", void 0);
BrowseComponent = __decorate([
    core_1.Component({
        selector: "Browse",
        moduleId: module.id,
        templateUrl: "./browse.component.html",
    }),
    __metadata("design:paramtypes", [])
], BrowseComponent);
exports.BrowseComponent = BrowseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0Qsc0VBQW9GO0FBUXBGLElBQWEsZUFBZTtJQUt4QjtJQUVBLENBQUM7SUFFRCxrQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFid0I7SUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OEJBQXlCLGdDQUFzQjt3REFBQztBQUgzRCxlQUFlO0lBTDNCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtLQUN6QyxDQUFDOztHQUNXLGVBQWUsQ0FnQjNCO0FBaEJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQnJvd3NlXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9icm93c2UuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEJyb3dzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5EcmF3ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci50b2dnbGVEcmF3ZXJTdGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==