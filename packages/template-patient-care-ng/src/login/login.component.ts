import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "kinvey-nativescript-sdk";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { UserService, Errors } from "kinvey-nativescript-sdk/lib/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-ui-dataform";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { isIOS } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";

import { LoginForm } from "./login-form.model";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    @ViewChild("loginFormElement", { static: false }) loginFormElement: RadDataFormComponent;
    isLoading: boolean;

    private _loginForm: LoginForm;

    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.isLoading = false;

        this._page.actionBarHidden = true;
        this._loginForm = new LoginForm();
    }

    get loginForm(): LoginForm {
        return this._loginForm;
    }

    onEditorUpdate(args: DataFormEventData) {
        // disable autocapitalization and autocorrection for email field
        if (isIOS && args.propertyName === "email") {
            args.editor.editor.autocapitalizationType = UITextAutocapitalizationType.None;
            args.editor.editor.autocorrectionType = UITextAutocorrectionType.No;
        }
    }

    onSigninButtonTap(): void {
        if (this.loginFormElement.dataForm.hasValidationErrors()) {
            return;
        }

        this.isLoading = true;

        this.userService.login(this._loginForm.email, this._loginForm.password)
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
                    title: "Login failed",
                    message: error.message,
                    okButtonText: "Ok"
                });
            });
    }

    onRegisterButtonTap(): void {
        this._routerExtensions.navigate(["/login/registration"],
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
