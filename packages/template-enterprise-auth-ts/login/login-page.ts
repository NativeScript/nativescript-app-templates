import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { LoginViewModel } from "./login-view-model";

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = new LoginViewModel();
}
