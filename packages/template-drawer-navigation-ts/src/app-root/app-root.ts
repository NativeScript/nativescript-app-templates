import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, EventData, Frame, GridLayout } from '@nativescript/core'

import { AppRootViewModel } from './app-root-view-model'

export function onLoaded(args: EventData): void {
  const drawerComponent = <RadSideDrawer>args.object
  drawerComponent.bindingContext = new AppRootViewModel()
}

export function onNavigationItemTap(args: EventData): void {
  const component = <GridLayout>args.object
  const componentRoute = component.get('route')
  const componentTitle = component.get('title')
  const bindingContext = <AppRootViewModel>component.bindingContext

  bindingContext.selectedPage = componentTitle

  Frame.topmost().navigate({
    moduleName: componentRoute,
    transition: {
      name: 'fade',
    },
  })

  const drawerComponent = <RadSideDrawer>Application.getRootView()
  drawerComponent.closeDrawer()
}
