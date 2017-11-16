import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { TaskService } from "../../../shared/task.service";
import { VisualConsentStep } from "../../shared/visual-consent-step.model";

@Component({
    selector: "Withdrawing",
    moduleId: module.id,
    templateUrl: "./withdrawing.component.html",
    styleUrls: ["../../consent-common.css"]
})
export class WithdrawingComponent implements OnInit {
    constructor(
        private _routerExtensions: RouterExtensions,
        private _taskService: TaskService
    ) { }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onNextButtonTap() {
        this._taskService.addStep(new VisualConsentStep("visualConsentStep"));

        this._routerExtensions.navigate(["/consent/consent-sharing"],
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
