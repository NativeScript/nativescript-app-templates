import { CarDetailEditViewModel } from "../car-detail-edit-view-model";

/* ***********************************************************
* The ImageAddRemove custom component uses an imagepicker plugin to let the user select
* an image and provides custom logic and design to the process.
*************************************************************/
export function onImageAddRemoveTap(args): void {
    const viewModel = <CarDetailEditViewModel>args.object.bindingContext;
    viewModel.onImageAddRemove();
}
