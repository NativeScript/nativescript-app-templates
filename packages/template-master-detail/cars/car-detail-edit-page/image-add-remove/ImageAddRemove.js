/* ***********************************************************
* The ImageAddRemove custom component uses an imagepicker plugin to let the user select
* an image and provides custom logic and design to the process.
*************************************************************/
function onImageAddRemoveTap(args) {
    const viewModel = args.object.bindingContext;
    viewModel.onImageAddRemove();
}

exports.onImageAddRemoveTap = onImageAddRemoveTap;
