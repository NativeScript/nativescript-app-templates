import * as app from "application";
import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { NavigatedData, Page } from "ui/page";

import { SettingsViewModel } from "./settings-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new SettingsViewModel();
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}
