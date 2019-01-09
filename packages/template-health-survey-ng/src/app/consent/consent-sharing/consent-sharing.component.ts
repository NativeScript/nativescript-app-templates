import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { ConsentSharingStep } from "../../core/task-manager/steps";
import { TaskManagerService } from "../../core/task-manager/task-manager.service";
import { AppService } from "../../shared/app.service";

@Component({
    selector: "ConsentSharing",
    moduleId: module.id,
    templateUrl: "./consent-sharing.component.html",
    styleUrls: ["../consent-common.css"]
})
export class ConsentSharingComponent implements OnInit {
    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions,
        private _taskManagerService: TaskManagerService
    ) { }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onOptionTap(selectedIndex: number) {
        const shareWithResearchers = selectedIndex === 0;
        this._taskManagerService.addStep(new ConsentSharingStep("consentSharingStep", shareWithResearchers));

        this._routerExtensions.navigate(["/consent/consent-review/review"],
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
