"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var SettingsComponent = (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent.prototype.openDrawer = function () {
        this.drawerComponent.sideDrawer.toggleDrawerState();
    };
    return SettingsComponent;
}());
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], SettingsComponent.prototype, "drawerComponent", void 0);
SettingsComponent = __decorate([
    core_1.Component({
        selector: "Settings",
        moduleId: module.id,
        templateUrl: "./settings.component.html",
    }),
    __metadata("design:paramtypes", [])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHNFQUFvRjtBQVFwRixJQUFhLGlCQUFpQjtJQUsxQjtJQUVBLENBQUM7SUFFRCxvQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELHNDQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFid0I7SUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OEJBQXlCLGdDQUFzQjswREFBQztBQUgzRCxpQkFBaUI7SUFMN0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkJBQTJCO0tBQzNDLENBQUM7O0dBQ1csaUJBQWlCLENBZ0I3QjtBQWhCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJTZXR0aW5nc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2V0dGluZ3MuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyBzaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XHJcblxyXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkRyYXdlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnRvZ2dsZURyYXdlclN0YXRlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19