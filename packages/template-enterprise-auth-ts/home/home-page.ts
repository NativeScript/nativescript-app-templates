import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { HomeViewModel } from "./home-view-model";

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.actionBarHidden = false;
    page.bindingContext = new HomeViewModel(page.navigationContext);
}
