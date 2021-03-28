import { Observable } from '@nativescript/core'

import { SelectedPageService } from '../shared/selected-page-service'

export class BrowseViewModel extends Observable {
  constructor() {
    super()

    SelectedPageService.getInstance().updateSelectedPage('Browse')
  }
}
