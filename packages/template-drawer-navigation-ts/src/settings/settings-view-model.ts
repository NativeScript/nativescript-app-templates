import { Observable } from '@nativescript/core'

import { SelectedPageService } from '../shared/selected-page-service'

export class SettingsViewModel extends Observable {
  constructor() {
    super()

    SelectedPageService.getInstance().updateSelectedPage('Settings')
  }
}
