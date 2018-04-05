import { StackLayout } from "ui/layouts/stack-layout";
import { NavigatedData } from "ui/page";

import { HomeViewModel } from "./home-view-model";

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    const page = <StackLayout>args.object;
    page.bindingContext = new HomeViewModel();
}
