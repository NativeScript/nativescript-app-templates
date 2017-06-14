import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CarDetailEditComponent } from "./car-detail-edit/car-detail-edit.component";
import { ListSelectorPickerComponent } from "./car-detail-edit/list-selector/list-selector-picker.component";
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarListComponent } from "./car-list.component";

const routes: Routes = [
    { path: "", component: CarListComponent },
    { path: "detail/:id", component: CarDetailComponent },
    { path: "detail-edit", component: CarDetailEditComponent },
    { path: "list-selector-picker/:tag/:items/:selectedIndex", component: ListSelectorPickerComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CarsRoutingModule { }
