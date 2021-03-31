import { fromObject } from "@nativescript/core"
import { SelectedPageService } from '../shared/selected-page-service'

export function FeaturedViewModel() {
  SelectedPageService.getInstance().updateSelectedPage('Featured')

  const viewModel = fromObject({
    /* Add your view model properties here */
  })

  return viewModel
}
