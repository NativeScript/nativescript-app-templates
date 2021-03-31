export function onNavigatingTo(args) {
  const page = args.object

  page.bindingContext = args.context
}

export function onBackButtonTap(args) {
  const view = args.object
  const page = view.page

  page.frame.goBack()
}
