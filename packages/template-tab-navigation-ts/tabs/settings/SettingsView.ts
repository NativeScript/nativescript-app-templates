import { EventData } from "data/observable";
import { View } from "ui/core/view";

import { SettingsViewModel } from "./settings-view-model";

export function onLoaded(args: EventData) {
    const component = <View>args.object;
    component.bindingContext = new SettingsViewModel();
}
