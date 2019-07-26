import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-ui-dataform";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { isIOS } from "tns-core-modules/platform";

import { ConsentReviewStep } from "../../../core/task-manager/steps";
import { TaskManagerService } from "../../../core/task-manager/task-manager.service";
import { AppService } from "../../../shared/app.service";
import { ConsentForm } from "./consent-form.model";

@Component({
    selector: "Consent",
    templateUrl: "./consent.component.html",
    styleUrls: ["../../consent-common.css"]
})
export class ConsentComponent implements OnInit {
    @ViewChild("consentFormElement", { static: false }) consentFormElement: RadDataFormComponent;
    private _consentForm: ConsentForm;

    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions,
        private _taskManagerService: TaskManagerService
    ) { }

    ngOnInit(): void {
        this._consentForm = new ConsentForm();
    }

    get consentForm(): ConsentForm {
        return this._consentForm;
    }

    onEditorUpdate(args: DataFormEventData) {
        // disable autocorrection for firstName and lastName fields
        if (isIOS && (args.propertyName === "firstName" || args.propertyName === "lastName")) {
            args.editor.editor.autocorrectionType = UITextAutocorrectionType.No;
        }
    }

    onDoneButtonTap() {
        if (this.consentFormElement.dataForm.hasValidationErrors()) {
            return;
        }

        const givenName = this._consentForm.firstName;
        const familyName = this._consentForm.lastName;
        const consentReviewStep = new ConsentReviewStep("consentReviewStep", givenName, familyName);

        this._taskManagerService.addStep(consentReviewStep);
        this._taskManagerService.pushTask("consentTask");

        this._routerExtensions.navigate(["/survey"],
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
