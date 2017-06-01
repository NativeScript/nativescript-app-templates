import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {
    public sideDrawerTransition: DrawerTransitionBase;

    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;

    constructor() {
        this.sideDrawerTransition = new SlideInOnTopTransition();
    }

    ngOnInit(): void {

    }

    openDrawer(): void {
        this.drawerComponent.sideDrawer.toggleDrawerState();
    }
}
