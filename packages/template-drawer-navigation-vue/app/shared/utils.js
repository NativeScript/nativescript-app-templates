import { Application } from '@nativescript/core'

export const showDrawer = () => {
  const root = Application.getRootView()
  if (root && root.open) {
    root.open()
  }
}

export const closeDrawer = () => {
  const root = Application.getRootView()
  if (root && root.close) {
    root.close()
  }
}
