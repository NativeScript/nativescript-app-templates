import { Component, OnInit, ViewChild } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";
import { isAndroid } from "platform";
import { Page } from "ui/page";
import { layout } from "utils/utils";

import { RegistrationStep, SignUpStep } from "../../core/task-manager/steps";
import { TaskManagerService } from "../../core/task-manager/task-manager.service";
import { LoginService } from "../shared/login.service";
import { RegistrationForm } from "./registration-form.model";

@Component({
    selector: "Registration",
    moduleId: module.id,
    templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit {
    @ViewChild("registrationFormElement") registrationFormElement: RadDataFormComponent;
    isLoading: boolean;

    private _registrationForm: RegistrationForm;

    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions,
        private _taskManagerService: TaskManagerService
    ) { }

    ngOnInit(): void {
        this.isLoading = false;

        if (isAndroid) {
            this._page.actionBarHidden = true;
        }
        this._registrationForm = new RegistrationForm();
    }

    get registrationForm(): RegistrationForm {
        return this._registrationForm;
    }

    onGroupUpdate(args) {
        // Apply padding to group headers.
        var group = args.group;
        var desiredPadding = 40;

        if (isAndroid) {
            let paddingInPixels = desiredPadding * layout.getDisplayDensity();
            group.getHeaderContainer().setPadding(0, paddingInPixels, 0, 0);
        }
        else {
            var defaultTitleHeight = 30;
            group.titleView.style.insets = new UIEdgeInsets({
                top: desiredPadding,
                left: group.titleView.style.insets.left,
                bottom: group.titleView.style.insets.bottom,
                right: group.titleView.style.insets.right
            });
            group.titleView.frame = CGRectMake(0, 0, 0, defaultTitleHeight + desiredPadding);
        }
    }

    onRegisterButtonTap(): void {
        const hasPasswordConfirmValidationErrors = this.hasPasswordConfirmValidationErrors();
        const hasValidationErrors = this.registrationFormElement.dataForm.hasValidationErrors();

        if (hasValidationErrors || hasPasswordConfirmValidationErrors) {
            return;
        }

        this.isLoading = true;

        this._taskManagerService.addStep(new RegistrationStep("registrationStep", this._registrationForm));

        LoginService.signup(this._registrationForm)
            .then((user: Kinvey.User) => {
                this._taskManagerService.addStep(new SignUpStep("signUp"));
                this._taskManagerService.pushTask("accountCreationTask");

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

                this.isLoading = false;
            })
            .catch((error: Kinvey.BaseError) => {
                this.isLoading = false;
                alert({
                    title: "Registration failed",
                    message: error.message,
                    okButtonText: "Ok"
                });
            });
    }

    private hasPasswordConfirmValidationErrors(): boolean {
        const password = this.registrationFormElement.dataForm.getPropertyByName("password");
        const passwordConfirm = this.registrationFormElement.dataForm.getPropertyByName("passwordConfirm");

        if (password.valueCandidate !== passwordConfirm.valueCandidate) {
            passwordConfirm.errorMessage = "Password does not match the confirm password.";
            this.registrationFormElement.dataForm.notifyValidated("passwordConfirm", false);

            return true;
        }

        return false;
    }
}
