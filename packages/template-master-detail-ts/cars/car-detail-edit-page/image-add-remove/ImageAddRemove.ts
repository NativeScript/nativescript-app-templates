/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { CarDetailEditViewModel } from "../car-detail-edit-view-model";

export function onImageAddRemoveTap(args): void {
    const viewModel = <CarDetailEditViewModel>args.object.bindingContext;
    viewModel.onImageAddRemove();
}
