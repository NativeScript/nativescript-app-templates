import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AppService } from "../../../shared/app.service";

@Component({
    selector: "DataUse",
    moduleId: module.id,
    templateUrl: "./data-use.component.html",
    styleUrls: ["../../consent-common.css"]
})
export class DataUseComponent implements OnInit {
    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onNextButtonTap() {
        this._routerExtensions.navigate(["/consent/visual-consent/time-commitment"],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
