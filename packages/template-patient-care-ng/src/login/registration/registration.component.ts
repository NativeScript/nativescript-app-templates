import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "kinvey-nativescript-sdk";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { UserService, Errors } from "kinvey-nativescript-sdk/lib/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-ui-dataform";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { layout } from "tns-core-modules/utils/utils";

import { RegistrationForm } from "./registration-form.model";

@Component({
    selector: "Registration",
    moduleId: module.id,
    templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit {
    @ViewChild("registrationFormElement", { static: false }) registrationFormElement: RadDataFormComponent;
    isLoading: boolean;

    private _registrationForm: RegistrationForm;

    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions,
        private userService: UserService
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

    onEditorUpdate(args: DataFormEventData) {
        // disable autocapitalization and autocorrection for email field
        if (isIOS && args.propertyName === "email") {
            args.editor.editor.autocapitalizationType = UITextAutocapitalizationType.None;
            args.editor.editor.autocorrectionType = UITextAutocorrectionType.No;
        }

        // disable autocorrection for givenName and familyName fields
        if (isIOS && (args.propertyName === "givenName" || args.propertyName === "familyName")) {
            args.editor.editor.autocorrectionType = UITextAutocorrectionType.No;
        }
    }

    onGroupUpdate(args: DataFormEventData) {
        // Apply padding to group headers.
        const group = args.group;
        const desiredPadding = 40;

        if (isIOS) {
            const defaultTitleHeight = 30;
            group.titleView.style.insets = new UIEdgeInsets({
                top: desiredPadding,
                left: group.titleView.style.insets.left,
                bottom: group.titleView.style.insets.bottom,
                right: group.titleView.style.insets.right
            });
            group.titleView.frame = CGRectMake(0, 0, 0, defaultTitleHeight + desiredPadding);
        } else {
            const paddingInPixels = desiredPadding * layout.getDisplayDensity();
            group.getHeaderContainer().setPadding(0, paddingInPixels, 0, 0);
        }
    }

    onRegisterButtonTap(): void {
        const hasPasswordConfirmValidationErrors = this.hasPasswordConfirmValidationErrors();
        const hasValidationErrors = this.registrationFormElement.dataForm.hasValidationErrors();

        if (hasValidationErrors || hasPasswordConfirmValidationErrors) {
            return;
        }

        this.isLoading = true;

        this.userService.signup(this._registrationForm.toPlainObject())
            .then((user: User) => {
                this._routerExtensions.navigate(["/care"],
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
            .catch((error: Errors.BaseError) => {
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
