const TabsViewModel = require("./tabs-view-model");

const viewModel = new TabsViewModel();

function onNavigatingTo(args) { // eslint-disable-line no-unused-vars
    /* ***********************************************************
    * Use the "onNavigatingTo" handler to initialize data for the whole tab
    * navigation layout as a whole.
    *************************************************************/

    const page = args.object;

    page.bindingContext = viewModel;
}

/* ***********************************************************
* Get the current tab view title and set it as an ActionBar title.
* Learn more about the onSelectedIndexChanged event here:
* https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
*************************************************************/
function onSelectedIndexChanged(args) {
    const selectedTabViewItem = args.object.items[args.newIndex];

    viewModel.set("title", selectedTabViewItem.title);
}

exports.onSelectedIndexChanged = onSelectedIndexChanged;
exports.onNavigatingTo = onNavigatingTo;
