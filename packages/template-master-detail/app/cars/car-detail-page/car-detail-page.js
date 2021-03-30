import { Frame } from '@nativescript/core'

import { CarDetailViewModel } from './car-detail-view-model'

export function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return
  }

  const page = args.object

  page.bindingContext = new CarDetailViewModel(page.navigationContext)
}

export function onBackButtonTap() {
  Frame.topmost().goBack()
}

export function onEditButtonTap(args) {
  const bindingContext = args.object.bindingContext

  Frame.topmost().navigate({
    moduleName: 'cars/car-detail-edit-page/car-detail-edit-page',
    context: bindingContext.car,
    animated: true,
    transition: {
      name: 'slideTop',
      duration: 200,
      curve: 'ease',
    },
  })
}

