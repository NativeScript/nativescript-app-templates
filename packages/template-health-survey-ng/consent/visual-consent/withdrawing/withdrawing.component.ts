import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { VisualConsentStep } from "../../../core/task-manager/steps";
import { TaskManagerService } from "../../../core/task-manager/task-manager.service";

@Component({
    selector: "Withdrawing",
    moduleId: module.id,
    templateUrl: "./withdrawing.component.html",
    styleUrls: ["../../consent-common.css"]
})
export class WithdrawingComponent implements OnInit {
    constructor(
        private _routerExtensions: RouterExtensions,
        private _taskManagerService: TaskManagerService
    ) { }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onNextButtonTap() {
        this._taskManagerService.addStep(new VisualConsentStep("visualConsentStep"));

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
