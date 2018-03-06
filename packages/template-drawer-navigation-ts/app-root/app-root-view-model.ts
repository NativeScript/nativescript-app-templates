import { Observable } from "data/observable";

import { ObservableProperty } from "../shared/observable-property-decorator";
/* ***********************************************************
* Keep data that is displayed in your app root.
*************************************************************/
export class AppRootViewModel extends Observable {
    @ObservableProperty() selectedPage: string;

    /* ***********************************************************
    * Use the app root view model constructor to initialize the properties data values.
    *************************************************************/
    constructor(selectedPage: string) {
        super();

        this.selectedPage = selectedPage;
    }
}
