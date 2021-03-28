import { HomeViewModel } from './home-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new HomeViewModel()
}
