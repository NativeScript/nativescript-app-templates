import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";

import { DrawerComponent } from "./drawer.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        DrawerComponent
    ],
    exports: [
        DrawerComponent,
        NativeScriptUISideDrawerModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class SharedModule { }
