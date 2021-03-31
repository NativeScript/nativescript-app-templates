import { SearchViewModel } from './search-view-model'

export function onNavigatingTo(args) {
  const component = args.object
  component.bindingContext = new SearchViewModel()
}
