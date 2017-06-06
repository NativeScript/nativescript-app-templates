import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { CarListComponent } from "./cars/car-list.component";
import { CarDetailComponent } from "./cars/car-detail/car-detail.component";
import { CarDetailEditComponent } from "./cars/car-detail-edit/car-detail-edit.component";
import { ListSelectorPickerComponent} from "./cars/car-detail-edit/list-selector/list-selector-picker.component";

const routes: Routes = [
    { path: "", redirectTo: "/cars", pathMatch: "full" },
    { path: "cars", component: CarListComponent },
    { path: "car-detail/:id", component: CarDetailComponent },
    { path: "car-detail-edit", component: CarDetailEditComponent },
    { path: "list-selector-picker/:tag/:items/:selectedIndex", component: ListSelectorPickerComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }