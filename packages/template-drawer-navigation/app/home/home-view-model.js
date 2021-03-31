import { fromObject } from '@nativescript/core'

import { SelectedPageService } from '../shared/selected-page-service'

export function HomeViewModel() {
  SelectedPageService.getInstance().updateSelectedPage('Home')

  const viewModel = fromObject({
    /* Add your view model properties here */
  })

  return viewModel
}
