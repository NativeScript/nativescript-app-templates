import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    sideDrawerTransition: DrawerTransitionBase;

    constructor() {
        this.sideDrawerTransition = new SlideInOnTopTransition();
    }

    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.toggleDrawerState();
    }
}
