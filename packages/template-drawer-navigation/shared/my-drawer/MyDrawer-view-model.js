const observableModule = require("data/observable");

/* ***********************************************************
 * Keep data that is displayed in your app drawer in the MyDrawer custom component view model.
 *************************************************************/
function MyDrawerViewModel(selectedPage) {
    const viewModel = observableModule.fromObject({
        /* ***********************************************************
         * Use the MyDrawer view model to initialize the properties data values.
         * The navigationItems property is initialized here and is data bound to <ListView> in the MyDrawer view file.
         * Add, remove or edit navigationItems to change what is displayed in the app drawer list.
         *************************************************************/
        navigationItems: [{
                title: "Home",
                name: "home",
                route: "home/home-page",
                icon: "\uf015",
                isSelected: selectedPage === "Home"
            },
            {
                title: "Browse",
                name: "browse",
                route: "browse/browse-page",
                icon: "\uf1ea",
                isSelected: selectedPage === "Browse"
            },
            {
                title: "Search",
                name: "search",
                route: "search/search-page",
                icon: "\uf002",
                isSelected: selectedPage === "Search"
            },
            {
                title: "Featured",
                name: "featured",
                route: "featured/featured-page",
                icon: "\uf005",
                isSelected: selectedPage === "Featured"
            },
            {
                title: "Settings",
                name: "settings",
                route: "settings/settings-page",
                icon: "\uf013",
                isSelected: selectedPage === "Settings"
            }
        ]
    });

    return viewModel;
}

module.exports = MyDrawerViewModel;
