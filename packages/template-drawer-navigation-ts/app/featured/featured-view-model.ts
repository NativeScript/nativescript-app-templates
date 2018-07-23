import { Observable } from "data/observable";

import { SelectedPageService } from "../shared/selected-page-service";

export class FeaturedViewModel extends Observable {
    constructor() {
        super();

        SelectedPageService.getInstance().updateSelectedPage("Featured");
    }
}
