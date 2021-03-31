import { ListViewEventData } from 'nativescript-ui-listview'
import { Frame, NavigatedData, Page } from '@nativescript/core'

import { CarsListViewModel } from './cars-list-view-model'
import { Car } from './shared/car-model'

export function onNavigatingTo(args: NavigatedData): void {
  if (args.isBackNavigation) {
    return
  }

  const viewModel = new CarsListViewModel()
  viewModel.load()

  const page = <Page>args.object
  page.bindingContext = viewModel
}

export function onCarItemTap(args: ListViewEventData): void {
  const tappedCarItem = <Car>args.view.bindingContext

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
