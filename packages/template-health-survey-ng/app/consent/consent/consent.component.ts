import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";

import { ConsentForm } from "./consent-form.model";

@Component({
    selector: "Consent",
    moduleId: module.id,
    templateUrl: "./consent.component.html",
    styleUrls: ["../consent-common.css", "../consent.css"]
})
export class ConsentComponent implements OnInit {
    @ViewChild("consentFormElement") consentFormElement: RadDataFormComponent;
    private _consentForm: ConsentForm;

    constructor(private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this._consentForm = new ConsentForm();
    }

    get consentForm(): ConsentForm {
        return this._consentForm;
    }

    onDoneButtonTap() {
        if (!this.consentFormElement.dataForm.hasValidationErrors()) {
            this._routerExtensions.navigate(["/survey"],
                {
                    animated: true,
                    transition: {
                        name: "slideRight",
                        duration: 200,
                        curve: "ease"
                    }
                });
        }
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
