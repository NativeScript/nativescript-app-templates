const TabsViewModel = require("./tabs-view-model");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize data for the whole tab
* navigation layout as a whole.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    page.bindingContext = new TabsViewModel();
}

/* ***********************************************************
 * Get the current tab view title and set it as an ActionBar title.
 * Learn more about the onSelectedIndexChanged event here:
 * https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
 *************************************************************/
function onSelectedIndexChanged(args) {
    const tabView = args.object;
    const bindingContext = tabView.bindingContext;
    const selectedTabViewItem = tabView.items[args.newIndex];

    bindingContext.set("title", selectedTabViewItem.title);
}

exports.onSelectedIndexChanged = onSelectedIndexChanged;
exports.onNavigatingTo = onNavigatingTo;
