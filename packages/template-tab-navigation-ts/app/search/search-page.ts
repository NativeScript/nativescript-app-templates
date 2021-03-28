import { NavigatedData, Page } from '@nativescript/core'
import { SearchViewModel } from './search-view-model'

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object
    page.bindingContext = new SearchViewModel()
}
