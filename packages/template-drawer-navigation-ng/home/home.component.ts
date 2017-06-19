import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
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
