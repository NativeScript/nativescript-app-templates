import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { CarDetailEditComponent } from "./car-detail-edit/car-detail-edit.component";
import { MyImageAddRemoveComponent } from "./car-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./car-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./car-detail-edit/my-list-selector/my-list-selector.component";
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarListComponent } from "./car-list.component";
import { CarsRoutingModule } from "./cars-routing.module";
import { CarEditService } from "./shared/car-edit.service";
import { CarService } from "./shared/car.service";

@NgModule({
    imports: [
        CarsRoutingModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        CarListComponent,
        CarDetailComponent,
        CarDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        CarService,
        CarEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CarsModule { }
