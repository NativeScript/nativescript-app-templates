import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { Page } from '@nativescript/core'
import { ItemService } from './item.service'

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ItemsComponent {
  itemService = inject(ItemService)
  page = inject(Page)

  constructor() {
    // Setup large titles on iOS
    this.page.on('loaded', (args) => {
      if (__IOS__) {
        const navigationController: UINavigationController = this.page.frame.ios.controller
        navigationController.navigationBar.prefersLargeTitles = true
      }
    })
  }
}
