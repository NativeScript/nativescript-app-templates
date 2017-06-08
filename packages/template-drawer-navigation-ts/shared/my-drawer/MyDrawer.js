"use strict";
var frameModule = require("ui/frame");
var model = {
    items: [
        {
            title: "Home",
            route: "home/home-page"
        },
        {
            title: "Browse",
            route: "browse/browse-page"
        },
        {
            title: "Search",
            route: "search/search-page"
        },
        {
            title: "Featured",
            route: "featured/featured-page"
        },
        {
            title: "Settings",
            route: "settings/settings-page"
        }
    ]
};
// Event handler for Page "navigatingTo" event attached in tabs-page.xml
function onLoaded(args) {
    /*
    This gets a reference this page’s <StackLayout> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;
    page.bindingContext = model;
}
exports.onLoaded = onLoaded;
function onNavigateToRoute(args) {
    var tappedModelItem = model.items[args.index];
    frameModule.topmost().navigate(tappedModelItem.route);
}
exports.onNavigateToRoute = onNavigateToRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlEcmF3ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeURyYXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0Esc0NBQXlDO0FBRXpDLElBQUksS0FBSyxHQUFHO0lBQ1IsS0FBSyxFQUFFO1FBQ0g7WUFDSSxLQUFLLEVBQUUsTUFBTTtZQUNiLEtBQUssRUFBRSxnQkFBZ0I7U0FDMUI7UUFDRDtZQUNJLEtBQUssRUFBRSxRQUFRO1lBQ2YsS0FBSyxFQUFFLG9CQUFvQjtTQUM5QjtRQUNEO1lBQ0ksS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUUsb0JBQW9CO1NBQzlCO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsVUFBVTtZQUNqQixLQUFLLEVBQUUsd0JBQXdCO1NBQ2xDO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsVUFBVTtZQUNqQixLQUFLLEVBQUUsd0JBQXdCO1NBQ2xDO0tBQ0o7Q0FDSixDQUFDO0FBRUYsd0VBQXdFO0FBQ3hFLGtCQUF5QixJQUFlO0lBQ3BDOzs7O01BSUU7SUFDRixJQUFJLElBQUksR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztBQUNoQyxDQUFDO0FBUkQsNEJBUUM7QUFFRCwyQkFBa0MsSUFBSTtJQUNsQyxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBSEQsOENBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcclxuXHJcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcclxuXHJcbmxldCBtb2RlbCA9IHtcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJIb21lXCIsXHJcbiAgICAgICAgICAgIHJvdXRlOiBcImhvbWUvaG9tZS1wYWdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQnJvd3NlXCIsXHJcbiAgICAgICAgICAgIHJvdXRlOiBcImJyb3dzZS9icm93c2UtcGFnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlNlYXJjaFwiLFxyXG4gICAgICAgICAgICByb3V0ZTogXCJzZWFyY2gvc2VhcmNoLXBhZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJGZWF0dXJlZFwiLFxyXG4gICAgICAgICAgICByb3V0ZTogXCJmZWF0dXJlZC9mZWF0dXJlZC1wYWdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgcm91dGU6IFwic2V0dGluZ3Mvc2V0dGluZ3MtcGFnZVwiXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59O1xyXG5cclxuLy8gRXZlbnQgaGFuZGxlciBmb3IgUGFnZSBcIm5hdmlnYXRpbmdUb1wiIGV2ZW50IGF0dGFjaGVkIGluIHRhYnMtcGFnZS54bWxcclxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgLypcclxuICAgIFRoaXMgZ2V0cyBhIHJlZmVyZW5jZSB0aGlzIHBhZ2XigJlzIDxTdGFja0xheW91dD4gVUkgY29tcG9uZW50LiBZb3UgY2FuXHJcbiAgICB2aWV3IHRoZSBBUEkgcmVmZXJlbmNlIG9mIHRoZSBQYWdlIHRvIHNlZSB3aGF04oCZcyBhdmFpbGFibGUgYXRcclxuICAgIGh0dHBzOi8vZG9jcy5uYXRpdmVzY3JpcHQub3JnL2FwaS1yZWZlcmVuY2UvY2xhc3Nlcy9fdWlfcGFnZV8ucGFnZS5odG1sXHJcbiAgICAqL1xyXG4gICAgbGV0IHBhZ2UgPSA8U3RhY2tMYXlvdXQ+YXJncy5vYmplY3Q7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbW9kZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRlVG9Sb3V0ZShhcmdzKSB7XHJcbiAgICBsZXQgdGFwcGVkTW9kZWxJdGVtID0gbW9kZWwuaXRlbXNbYXJncy5pbmRleF07XHJcbiAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUodGFwcGVkTW9kZWxJdGVtLnJvdXRlKTtcclxufSJdfQ==