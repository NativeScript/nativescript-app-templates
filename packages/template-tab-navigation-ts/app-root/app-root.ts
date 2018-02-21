import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";

/* ***********************************************************
* Get the current tab view title and set it as an ActionBar title.
* Learn more about the onSelectedIndexChanged event here:
* https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
*************************************************************/
export function onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    /* ***********************************************************
    * Comment out the code block below to get the current tab view.
    *************************************************************/
    // const tabView = <TabView>args.object;
    // const bindingContext = <TabsViewModel>tabView.bindingContext;
    // const selectedTabViewItem = tabView.items[args.newIndex];
}
