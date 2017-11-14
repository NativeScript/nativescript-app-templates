import { Component, OnInit, ViewChild } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";

import { LoginService } from "../login.service";
import { RegistrationForm } from "./registration-form.model";

@Component({
    selector: "Registration",
    moduleId: module.id,
    templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit {
    @ViewChild("registrationFormElement") registrationFormElement: RadDataFormComponent;
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

    onRegisterButtonTap(): void {
        const hasPasswordConfirmValidationErrors = this.hasPasswordConfirmValidationErrors();
        const hasValidationErrors = this.registrationFormElement.dataForm.hasValidationErrors();

        if (hasValidationErrors || hasPasswordConfirmValidationErrors) {
            return;
        }

        LoginService.signup(this._registrationForm)
            .catch((error: Kinvey.BaseError) => {
                alert(error);
            });
    }

    private hasPasswordConfirmValidationErrors(): boolean {
        const password = this.registrationFormElement.dataForm.getPropertyByName("password");
        const passwordConfirm = this.registrationFormElement.dataForm.getPropertyByName("passwordConfirm");

        if (password !== passwordConfirm) {
            passwordConfirm.errorMessage = "Password does not match the confirm password.";
            this.registrationFormElement.dataForm.notifyValidated("passwordConfirm", false);

            return true;
        }

        return false;
    }
}
