import { ListSelectorViewModel } from './list-selector-view-model'

let viewModel

export function onShownModally(args) {
  const page = args.object

  viewModel = new ListSelectorViewModel(args.context, args.closeCallback)
  page.bindingContext = viewModel
}

export function onItemSelected(args) {
  viewModel.selectItem(args.index)
}

export function onCancelButtonTap() {
  viewModel.cancelSelection()
}
