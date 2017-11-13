import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "SharingOptions",
    moduleId: module.id,
    templateUrl: "./sharing-options.component.html",
    styleUrls: ["../consent-common.css", "../consent.css"]
})
export class SharingOptionsComponent implements OnInit {
    constructor(private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onOptionTap(selectedIndex: number) {

        // TODO: Save sharing option.

        this._routerExtensions.navigate(["/consent/review"],
            {
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    onCancelButtonTap() {
        this._routerExtensions.navigate(["/login"],
            {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
