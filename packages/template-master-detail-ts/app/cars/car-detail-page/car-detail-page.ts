import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { CarDetailViewModel } from "./car-detail-view-model";

export function onNavigatingTo(args: NavigatedData): void {
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;

    page.bindingContext = new CarDetailViewModel(page.navigationContext);
}

export function onBackButtonTap(): void {
    topmost().goBack();
}

export function onEditButtonTap(args): void {
    const bindingContext = <CarDetailViewModel>args.object.bindingContext;

    topmost().navigate({
        moduleName: "cars/car-detail-edit-page/car-detail-edit-page",
        context: bindingContext.car,
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
}
