const core = require('@nativescript/core')

const SelectedPageService = require('../shared/selected-page-service')

function FeaturedViewModel() {
    SelectedPageService.getInstance().updateSelectedPage('Featured')

    const viewModel = core.fromObject({
        /* Add your view model properties here */
    })

    return viewModel
}

module.exports = FeaturedViewModel
