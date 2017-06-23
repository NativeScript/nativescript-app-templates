import { Observable } from "data/observable";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer custom component view model.
*************************************************************/
export class MyDrawerViewModel extends Observable {
    private _navigationItems: Array<any>;

    /* ***********************************************************
    * Use the MyDrawer view model constructor to initialize the properties data values.
    * The navigationItems property is initialized here and is data bound to <ListView> in the MyDrawer view file.
    * Add, remove or edit navigationItems to change what is displayed in the app drawer list.
    *************************************************************/
    constructor() {
        super();

        this._navigationItems = [
            {
                title: "Home",
                name: "home",
                route: "home/home-page",
                icon: "\uf015"
            },
            {
                title: "Browse",
                name: "browse",
                route: "browse/browse-page",
                icon: "\uf1ea"
            },
            {
                title: "Search",
                name: "search",
                route: "search/search-page",
                icon: "\uf002"
            },
            {
                title: "Featured",
                name: "featured",
                route: "featured/featured-page",
                icon: "\uf005"
            },
            {
                title: "Settings",
                name: "settings",
                route: "settings/settings-page",
                icon: "\uf013"
            }
        ];
    }

    get navigationItems(): Array<any> {
        return this._navigationItems;
    }
}
