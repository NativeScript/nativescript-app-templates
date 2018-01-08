import { Observable } from "data/observable";

import { ObservableProperty } from "../../shared/observable-property-decorator";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the drawer custom component view model.
*************************************************************/
export class DrawerViewModel extends Observable {
    @ObservableProperty() selectedPage: string;

    /* ***********************************************************
    * Use the drawer view model constructor to initialize the properties data values.
    *************************************************************/
    constructor(selectedPage: string) {
        super();

        this.selectedPage = selectedPage;
    }
}
