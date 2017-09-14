import { Observable } from "data/observable";
import { isAndroid } from "platform";

import { ObservableProperty } from "../shared/observable-property-decorator";

export class TabsViewModel extends Observable {
    @ObservableProperty() title: string;

    constructor() {
        super();
    }
}
