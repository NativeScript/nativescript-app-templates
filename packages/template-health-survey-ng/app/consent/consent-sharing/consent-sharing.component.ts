import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { ConsentSharingStep } from "../shared/consent-sharing-step.model";
import { ConsentTaskService } from "../shared/consent-task.service";

@Component({
    selector: "ConsentSharing",
    moduleId: module.id,
    templateUrl: "./consent-sharing.component.html",
    styleUrls: ["../consent-common.css"]
})
export class ConsentSharingComponent implements OnInit {
    constructor(
        private _routerExtensions: RouterExtensions,
        private _consentTaskService: ConsentTaskService
    ) { }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onOptionTap(selectedIndex: number) {
        const shareWithResearchers = selectedIndex === 0;
        this._consentTaskService.addStep(new ConsentSharingStep("consentSharingStep", shareWithResearchers));

        this._routerExtensions.navigate(["/consent/consent-review/review"],
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
