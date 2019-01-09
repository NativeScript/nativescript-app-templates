import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { RegistrationComponent } from "./registration/registration.component";

@NgModule({
    imports: [
        LoginRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIDataFormModule
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
