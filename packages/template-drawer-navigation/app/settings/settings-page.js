import { Application } from '@nativescript/core'

import { SettingsViewModel } from './settings-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new SettingsViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}
