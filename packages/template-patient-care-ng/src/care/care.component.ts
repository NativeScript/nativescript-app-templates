import { Component } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";

@Component({
    selector: "CareComponent",
    templateUrl: "./care.component.html",
    styleUrls: ["./care-common.css"]
})
export class CareComponent {
    title: string;

    getIconSource(icon: string): string {
        return isAndroid ? "" : "res://" + icon;
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        const tabView = <TabView>args.object;
        const selectedTabViewItem = tabView.items[args.newIndex];

        this.title = selectedTabViewItem.title;
    }
}
