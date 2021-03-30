import { fromObject } from '@nativescript/core'

import { SelectedPageService } from '../shared/selected-page-service'

export function SettingsViewModel() {
  SelectedPageService.getInstance().updateSelectedPage('Settings')

  const viewModel = fromObject({
    /* Add your view model properties here */
  })

  return viewModel
}
