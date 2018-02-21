import { View } from "ui/core/view";
import { ItemEventData } from "ui/list-view";
import { NavigatedData, Page } from "ui/page";

import { HomeViewModel } from "./home-view-model";
import { Item } from "./shared/item";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HomeViewModel();
}

export function onItemTap(args: ItemEventData) {
    const view = args.view as View;
    const page = view.page as Page;

    const tappedItem = view.bindingContext as Item;

    page.frame.navigate({
        moduleName: "home/home-item-detail/home-item-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}
