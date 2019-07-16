import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AppService } from "../../../shared/app.service";

@Component({
    selector: "DataGathering",
    templateUrl: "./data-gathering.component.html",
    styleUrls: ["../../consent-common.css"]
})
export class DataGatheringComponent implements OnInit {
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
        this._routerExtensions.navigate(["/consent/visual-consent/data-use"],
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
