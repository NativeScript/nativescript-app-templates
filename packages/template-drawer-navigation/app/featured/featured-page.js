import { Application } from '@nativescript/core'

import { FeaturedViewModel } from './featured-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new FeaturedViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}

