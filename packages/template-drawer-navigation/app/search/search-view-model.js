import { fromObject } from '@nativescript/core'

import { SelectedPageService } from '../shared/selected-page-service'

export function SearchViewModel() {
  SelectedPageService.getInstance().updateSelectedPage('Search')

  const viewModel = fromObject({
    /* Add your view model properties here */
  })

  return viewModel
}
