/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { NavigatedData, Page } from '@nativescript/core'

import { HomeViewModel } from './home-view-model'

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object

  page.bindingContext = new HomeViewModel()
}
