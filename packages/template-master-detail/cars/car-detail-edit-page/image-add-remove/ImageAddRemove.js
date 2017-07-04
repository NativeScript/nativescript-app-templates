function onImageAddRemoveTap(args) {
    const viewModel = args.object.bindingContext;
    viewModel.onImageAddRemove();
}

exports.onImageAddRemoveTap = onImageAddRemoveTap;
