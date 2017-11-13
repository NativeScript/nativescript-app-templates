import { Component, OnInit } from "@angular/core";

import { AdditionalInfoForm } from "./additional-info-form.model";
import { RegistrationForm } from "./registration-form.model";

@Component({
    selector: "Registration",
    moduleId: module.id,
    templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit {
    private _registrationForm: RegistrationForm;

    constructor() {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        this._registrationForm = new RegistrationForm();
    }

    get registrationForm(): RegistrationForm {
        return this._registrationForm;
    }

    onSignupButtonTap(): void {
        // const name = this.name;
        // const email = this.email;
        // const password = this.password;

        /* ***********************************************************
        * Call your custom signup logic using the email and password data.
        *************************************************************/
    }
}
