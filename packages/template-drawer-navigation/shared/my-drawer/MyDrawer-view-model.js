const Observable = require("data/observable").Observable;

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer custom component view model.
*************************************************************/
function MyDrawerViewModel() {
    const viewModel = new Observable();

    /* ***********************************************************
    * Use the MyDrawer view model to initialize the properties data values.
    * The navigationItems property is initialized here and is data bound to <ListView> in the MyDrawer view file.
    * Add, remove or edit navigationItems to change what is displayed in the app drawer list.
    *************************************************************/
    viewModel.navigationItems = [
        {
            title: "Home",
            route: "home/home-page",
            icon: "\uf015"
        },
        {
            title: "Browse",
            route: "browse/browse-page",
            icon: "\uf1ea"
        },
        {
            title: "Search",
            route: "search/search-page",
            icon: "\uf002"
        },
        {
            title: "Featured",
            route: "featured/featured-page",
            icon: "\uf005"
        },
        {
            title: "Settings",
            route: "settings/settings-page",
            icon: "\uf013"
        }
    ];

    return viewModel;
}

module.exports = MyDrawerViewModel;
