const core = require('@nativescript/core')

const SelectedPageService = require('../shared/selected-page-service')

function SettingsViewModel() {
  SelectedPageService.getInstance().updateSelectedPage('Settings')

  const viewModel = core.fromObject({
    /* Add your view model properties here */
  })

  return viewModel
}

module.exports = SettingsViewModel
