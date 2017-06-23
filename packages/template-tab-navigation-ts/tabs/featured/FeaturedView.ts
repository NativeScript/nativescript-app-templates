import { EventData } from "data/observable";
import { StackLayout } from "ui/layouts/stack-layout";

import { FeaturedViewModel } from "./featured-view-model";

export function onLoaded(args: EventData) {
    const component = <StackLayout> args.object;
    component.bindingContext = new FeaturedViewModel();
}
