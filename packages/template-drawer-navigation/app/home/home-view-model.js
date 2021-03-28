const core = require('@nativescript/core')

const SelectedPageService = require('../shared/selected-page-service')

function HomeViewModel() {
  SelectedPageService.getInstance().updateSelectedPage('Home')

  const viewModel = core.fromObject({
    /* Add your view model properties here */
  })

  return viewModel
}

module.exports = HomeViewModel
