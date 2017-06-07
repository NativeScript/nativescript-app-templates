import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIListViewModule } from "nativescript-telerik-ui/listview/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CarDetailEditComponent } from "./cars/car-detail-edit/car-detail-edit.component";
import { ImageAddRemoveComponent } from "./cars/car-detail-edit/image-add-remove/image-add-remove.component";
import { ListSelectorPickerComponent} from "./cars/car-detail-edit/list-selector/list-selector-picker.component";
import { ListSelectorComponent } from "./cars/car-detail-edit/list-selector/list-selector.component";
import { CarDetailComponent } from "./cars/car-detail/car-detail.component";
import { CarListComponent } from "./cars/car-list.component";
import { CarEditService } from "./cars/shared/car-edit.service";
import { CarService } from "./cars/shared/car.service";

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
