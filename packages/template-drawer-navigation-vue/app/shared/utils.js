import { Application } from '@nativescript/core'

export const showDrawer = () => {
  let drawerNativeView = Application.getRootView()
  if (drawerNativeView && drawerNativeView.showDrawer) {
    drawerNativeView.showDrawer()
  }
}

export const closeDrawer = () => {
  let drawerNativeView = Application.getRootView()
  if (drawerNativeView && drawerNativeView.showDrawer) {
    drawerNativeView.closeDrawer()
  }
}
