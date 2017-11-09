import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { RegistrationComponent } from "./registration/registration.component";

@NgModule({
    imports: [
        NativeScriptModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent,
        RegistrationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
