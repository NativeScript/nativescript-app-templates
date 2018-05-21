import { Observable } from "data/observable";

import { SelectedPageService } from "../shared/selected-page-service";

export class SearchViewModel extends Observable {
    constructor() {
        super();

        SelectedPageService.getInstance().updateSelectedPage("Search");
    }
}
