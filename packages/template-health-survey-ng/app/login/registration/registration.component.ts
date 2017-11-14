import { Component, OnInit, ViewChild } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";

import { LoginService } from "../shared/login.service";
import { RegistrationForm } from "./registration-form.model";

@Component({
    selector: "Registration",
    moduleId: module.id,
    templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit {
    @ViewChild("registrationFormElement") registrationFormElement: RadDataFormComponent;
    private _registrationForm: RegistrationForm;

    constructor(private routerExtensions: RouterExtensions) {
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
            .then((user: Kinvey.User) => {
                this.routerExtensions.navigate(["/consent"],
                    {
                        clearHistory: true,
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 200,
                            curve: "ease"
                        }
                    });
            })
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
