import { fromObject } from '@nativescript/core'

export function CarDetailViewModel(carModel) {
  const viewModel = fromObject({
    car: carModel,
  })

  return viewModel
}
