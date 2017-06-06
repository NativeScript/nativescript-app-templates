import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { NativeScriptUIListViewModule } from "nativescript-telerik-ui/listview/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CarService } from "./cars/shared/car.service";
import { CarEditService } from "./cars/shared/car-edit.service";
import { CarListComponent } from "./cars/car-list.component";
import { CarDetailComponent } from "./cars/car-detail/car-detail.component";
import { CarDetailEditComponent } from "./cars/car-detail-edit/car-detail-edit.component";
import { ListSelectorComponent } from "./cars/car-detail-edit/list-selector/list-selector.component";
import { ListSelectorPickerComponent} from "./cars/car-detail-edit/list-selector/list-selector-picker.component";
import { ImageAddRemoveComponent } from "./cars/car-detail-edit/image-add-remove/image-add-remove.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        CarListComponent,
        CarDetailComponent,
        CarDetailEditComponent,
        ListSelectorComponent,
        ListSelectorPickerComponent,
        ImageAddRemoveComponent
    ],
    providers: [
        CarService,
        CarEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
