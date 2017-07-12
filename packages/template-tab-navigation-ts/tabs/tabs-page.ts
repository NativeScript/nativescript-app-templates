import { EventData } from "data/observable";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";
import { Page } from "ui/page";

import { TabsViewModel } from "./tabs-view-model";

const viewModel = new TabsViewModel();

export function onNavigatingTo(args: EventData) {
    /* ***********************************************************
    * Use the "onNavigatingTo" handler to initialize data for the whole tab
    * navigation layout as a whole.
    *************************************************************/

    const page = <Page>args.object;
    page.bindingContext = viewModel;
}

/* ***********************************************************
* Get the current tab view title and set it as an ActionBar title.
* Learn more about the onSelectedIndexChanged event here:
* https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
*************************************************************/
export function onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    const tabView = <TabView>args.object;
    const selectedTabViewItem = tabView.items[args.newIndex];

    viewModel.title = selectedTabViewItem.title;
}
