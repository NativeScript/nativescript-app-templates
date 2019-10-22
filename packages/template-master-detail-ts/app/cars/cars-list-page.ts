import { topmost } from "tns-core-modules/ui/frame";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { CarsListViewModel } from "./cars-list-view-model";
import { Car } from "./shared/car-model";

export function onNavigatingTo(args: NavigatedData): void {
    if (args.isBackNavigation) {
        return;
    }

    const viewModel = new CarsListViewModel();
    viewModel.load();

    const page = <Page>args.object;
    page.bindingContext = viewModel;
}

export function onCarItemTap(args: ItemEventData): void {
    const tappedCarItem = <Car>args.view.bindingContext;

    topmost().navigate({
        moduleName: "cars/car-detail-page/car-detail-page",
        context: tappedCarItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}
