import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular'

import { CarDetailEditComponent } from './car-detail-edit/car-detail-edit.component'
import { MyImageAddRemoveComponent } from './car-detail-edit/my-image-add-remove/my-image-add-remove.component'
import { MyListSelectorModalViewComponent } from './car-detail-edit/my-list-selector/my-list-selector-modal-view.component' 
import { MyListSelectorComponent } from './car-detail-edit/my-list-selector/my-list-selector.component'
import { CarDetailComponent } from './car-detail/car-detail.component'
import { CarListComponent } from './car-list.component'
import { CarsRoutingModule } from './cars-routing.module'

@NgModule({
  imports: [
    CarsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptUIListViewModule,
  ],
  declarations: [
    CarListComponent,
    CarDetailComponent,
    CarDetailEditComponent,
    MyListSelectorComponent,
    MyListSelectorModalViewComponent,
    MyImageAddRemoveComponent,
  ],
  entryComponents: [MyListSelectorModalViewComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CarsModule {}
