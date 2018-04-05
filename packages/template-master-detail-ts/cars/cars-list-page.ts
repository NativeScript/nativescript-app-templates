import { ListViewEventData } from "nativescript-ui-listview";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { CarsListViewModel } from "./cars-list-view-model";
import { Car } from "./shared/car-model";

export function onNavigatingTo(args: NavigatedData): void {
    const page = <Page>args.object;

    let viewModel = <CarsListViewModel>page.bindingContext;
    if (!args.isBackNavigation) {
        viewModel = new CarsListViewModel();
        page.bindingContext = viewModel;
    }

    viewModel.load();
}

export function onNavigatingFrom(args: NavigatedData): void {
    const page = <Page>args.object;
    const oldViewModel = <CarsListViewModel>page.bindingContext;
    if (oldViewModel) {
        oldViewModel.unload();
    }
}

export function onCarItemTap(args: ListViewEventData): void {
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
