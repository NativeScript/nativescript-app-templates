import { Component, OnInit, ViewChild } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-ui-dataform";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { isIOS } from "platform";
import { alert } from "ui/dialogs";
import { Page } from "ui/page";

import { LoginForm } from "./login-form.model";
import { UserService } from "./shared/user.service";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    @ViewChild("loginFormElement") loginFormElement: RadDataFormComponent;
    isLoading: boolean;

    private _loginForm: LoginForm;

    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions
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

        UserService.login(this._loginForm.email, this._loginForm.password)
            .then((user: Kinvey.User) => {
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
            .catch((error: Kinvey.BaseError) => {
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
