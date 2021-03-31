import { Application } from '@nativescript/core'

import { HomeViewModel } from './home-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new HomeViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}

