import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { Page } from '@nativescript/core'
import { PersonService } from './person.service'

@Component({
  selector: 'ns-people',
  templateUrl: './people.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent {
  personService = inject(PersonService);
  page = inject(Page);

  constructor() {
    // Setup large titles on iOS
    this.page.on('loaded', (args) => {
      if (__IOS__) {
        const navigationController: UINavigationController = this.page.frame.ios.controller;
        navigationController.navigationBar.prefersLargeTitles = true;
      }
    })
  }
}
