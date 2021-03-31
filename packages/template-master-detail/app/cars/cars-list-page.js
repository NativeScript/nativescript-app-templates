import { Frame } from '@nativescript/core'

import { CarsListViewModel } from './cars-list-view-model'

export function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return
  }

  const viewModel = new CarsListViewModel()
  viewModel.load()

  const page = args.object
  page.bindingContext = viewModel
}

export function onCarItemTap(args) {
  const tappedCarItem = args.view.bindingContext

  Frame.topmost().navigate({
    moduleName: 'cars/car-detail-page/car-detail-page',
    context: tappedCarItem,
    animated: true,
    transition: {
      name: 'slide',
      duration: 200,
      curve: 'ease',
    },
  })
}
