import { Component, OnInit, ViewChild } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";

import { LoginForm } from "./login-form.model";
import { LoginService } from "./shared/login.service";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    @ViewChild("loginFormElement") loginFormElement: RadDataFormComponent;
    private _loginForm: LoginForm;

    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this._loginForm = new LoginForm();
    }

    get loginForm(): LoginForm {
        return this._loginForm;
    }

    onSigninButtonTap(): void {
        if (this.loginFormElement.dataForm.hasValidationErrors()) {
            return;
        }

        LoginService.login(this._loginForm.email, this._loginForm.password)
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

    onRegisterButtonTap(): void {
        this.routerExtensions.navigate(["/login/registration"],
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
