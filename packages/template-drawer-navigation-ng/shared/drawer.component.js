"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var DrawerComponent = (function () {
    function DrawerComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.items = [
            {
                title: "Home",
                route: "/home",
                icon: "\uf015"
            },
            {
                title: "Browse",
                route: "/browse",
                icon: "\uf1ea"
            },
            {
                title: "Search",
                route: "/search",
                icon: "\uf002"
            },
            {
                title: "Featured",
                route: "/featured",
                icon: "\uf005"
            },
            {
                title: "Settings",
                route: "/settings",
                icon: "\uf013"
            }
        ];
    }
    DrawerComponent.prototype.ngOnInit = function () {
    };
    DrawerComponent.prototype.navigateToRoute = function (route) {
        this.routerExtensions.navigate([route]);
    };
    DrawerComponent.prototype.isPageSelected = function (pageTitle) {
        return pageTitle === this.selectedPage;
    };
    return DrawerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DrawerComponent.prototype, "selectedPage", void 0);
DrawerComponent = __decorate([
    core_1.Component({
        selector: "MyDrawer",
        moduleId: module.id,
        templateUrl: "./drawer.component.html",
        styleUrls: ["./drawer.component.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions])
], DrawerComponent);
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRyYXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsc0RBQStEO0FBUS9ELElBQWEsZUFBZTtJQThCeEIseUJBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBNUJ0RCxVQUFLLEdBQVE7WUFDVDtnQkFDSSxLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxRQUFRO2dCQUNmLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxRQUFRO2dCQUNmLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxVQUFVO2dCQUNqQixLQUFLLEVBQUUsV0FBVztnQkFDbEIsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsVUFBVTtnQkFDakIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQTtJQUlELENBQUM7SUFFRCxrQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHlDQUFlLEdBQWYsVUFBZ0IsS0FBWTtRQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFlLFNBQWdCO1FBQzNCLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQyxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBM0NZO0lBQVIsWUFBSyxFQUFFOztxREFBc0I7QUFEckIsZUFBZTtJQU4zQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx5QkFBeUI7UUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7S0FDeEMsQ0FBQztxQ0ErQndDLHlCQUFnQjtHQTlCN0MsZUFBZSxDQTRDM0I7QUE1Q1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJNeURyYXdlclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZHJhd2VyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vZHJhd2VyLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIERyYXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZFBhZ2U6IHN0cmluZztcclxuICAgIGl0ZW1zOiBhbnkgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJIb21lXCIsXHJcbiAgICAgICAgICAgIHJvdXRlOiBcIi9ob21lXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiXFx1ZjAxNVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkJyb3dzZVwiLFxyXG4gICAgICAgICAgICByb3V0ZTogXCIvYnJvd3NlXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiXFx1ZjFlYVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlNlYXJjaFwiLFxyXG4gICAgICAgICAgICByb3V0ZTogXCIvc2VhcmNoXCIsXHJcbiAgICAgICAgICAgIGljb246IFwiXFx1ZjAwMlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkZlYXR1cmVkXCIsXHJcbiAgICAgICAgICAgIHJvdXRlOiBcIi9mZWF0dXJlZFwiLFxyXG4gICAgICAgICAgICBpY29uOiBcIlxcdWYwMDVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICByb3V0ZTogXCIvc2V0dGluZ3NcIixcclxuICAgICAgICAgICAgaWNvbjogXCJcXHVmMDEzXCJcclxuICAgICAgICB9XHJcbiAgICBdXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlVG9Sb3V0ZShyb3V0ZTpzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW3JvdXRlXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNQYWdlU2VsZWN0ZWQocGFnZVRpdGxlOnN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBwYWdlVGl0bGUgPT09IHRoaXMuc2VsZWN0ZWRQYWdlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==