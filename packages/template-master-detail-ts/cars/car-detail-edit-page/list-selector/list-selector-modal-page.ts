import { ShownModallyData } from "tns-core-modules/ui/page";
import { View } from "ui/page";

import { ListSelectorViewModel } from "./list-selector-view-model";

let viewModel: ListSelectorViewModel;

export function onShownModally(args: ShownModallyData): void {
    viewModel = new ListSelectorViewModel(args.context, args.closeCallback);
    (<View>args.object).bindingContext = viewModel;
}

export function onItemSelected(args): void {
    viewModel.selectItem(args.itemIndex);
}

export function onCancelButtonTap(): void {
    viewModel.cancelSelection();
}
