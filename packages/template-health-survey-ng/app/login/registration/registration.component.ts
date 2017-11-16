import { Component, OnInit, ViewChild } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";

import { RegistrationStep } from "../../shared/registration-step.model";
import { SignUpStep } from "../../shared/sign-up-step.model";
import { TaskService } from "../../shared/task.service";
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

    constructor(
        private _routerExtensions: RouterExtensions,
        private _taskService: TaskService
    ) { }

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

        this._taskService.addStep(new RegistrationStep("registrationStep", this._registrationForm));

        LoginService.signup(this._registrationForm)
            .then((user: Kinvey.User) => {
                this._taskService.addStep(new SignUpStep("signUp"));
                this._taskService.pushTask("accountCreationTask");

                this._routerExtensions.navigate(["/consent"],
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

        if (password.valueCandidate !== passwordConfirm.valueCandidate) {
            console.log(password);
            console.log(passwordConfirm);
            passwordConfirm.errorMessage = "Password does not match the confirm password.";
            this.registrationFormElement.dataForm.notifyValidated("passwordConfirm", false);

            return true;
        }

        return false;
    }
}
