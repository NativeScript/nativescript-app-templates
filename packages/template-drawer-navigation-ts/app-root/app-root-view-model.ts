import { Observable } from "data/observable";

import { ObservableProperty } from "../shared/observable-property-decorator";

export class AppRootViewModel extends Observable {
    @ObservableProperty() selectedPage: string;

    constructor(selectedPage: string) {
        super();

        this.selectedPage = selectedPage;
    }
}
