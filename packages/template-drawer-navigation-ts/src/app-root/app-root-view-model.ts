import { Observable } from "@nativescript/core";

import { ObservableProperty } from "../shared/observable-property-decorator";
import { SelectedPageService } from "../shared/selected-page-service";

export class AppRootViewModel extends Observable {
    @ObservableProperty() selectedPage: string;

    constructor() {
        super();

        SelectedPageService.getInstance().selectedPage$
        .subscribe((selectedPage: string) => this.selectedPage = selectedPage);
    }
}
