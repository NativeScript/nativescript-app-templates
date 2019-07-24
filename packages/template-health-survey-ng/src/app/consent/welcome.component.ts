import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AppService } from "../shared/app.service";

@Component({
    selector: "Welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./consent-common.css"]
})
export class WelcomeComponent implements OnInit {
    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onGetStartedButtonTap() {
        this._routerExtensions.navigate(["/consent/visual-consent/data-gathering"],
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
