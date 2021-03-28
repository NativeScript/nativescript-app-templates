const core = require('@nativescript/core')

const SelectedPageService = require('../shared/selected-page-service')

function SearchViewModel() {
    SelectedPageService.getInstance().updateSelectedPage('Search')

    const viewModel = core.fromObject({
        /* Add your view model properties here */
    })

    return viewModel
}

module.exports = SearchViewModel
