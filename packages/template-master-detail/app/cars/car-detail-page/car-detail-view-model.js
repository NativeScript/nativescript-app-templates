const { fromObject } = require('@nativescript/core')

function CarDetailViewModel(carModel) {
  const viewModel = fromObject({
    car: carModel,
  })

  return viewModel
}

module.exports = CarDetailViewModel
