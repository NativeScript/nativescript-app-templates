import { Frame } from "tns-core-modules/ui/frame";
import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { CarDetailViewModel } from "./car-detail-view-model";

export function onNavigatingTo(args: NavigatedData): void {
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;

    page.bindingContext = new CarDetailViewModel(page.navigationContext);
}

export function onBackButtonTap(): void {
    Frame.topmost().goBack();
}

export function onEditButtonTap(args): void {
    const bindingContext = <CarDetailViewModel>args.object.bindingContext;

    Frame.topmost().navigate({
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
