function onNavigatingTo(args) {
    const page = args.object;

    page.bindingContext = args.context;
}

/* ***********************************************************
* The back button is essential for a master-detail feature.
*************************************************************/
function onBackButtonTap(args) {
    const view = args.object;
    const page = view.page;

    page.frame.goBack();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;

