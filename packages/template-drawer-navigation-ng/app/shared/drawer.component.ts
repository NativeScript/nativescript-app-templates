import { Component, OnInit, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "MyDrawer",
    moduleId: module.id,
    templateUrl: "./drawer.component.html",
    styleUrls: ["./drawer.component.css"]
})
export class DrawerComponent implements OnInit {
    @Input() selectedPage: string;
    items: any = [
        {
            title: "Home",
            route: "/home",
            icon: "\uf015"
        },
        {
            title: "Browse",
            route: "/browse",
            icon: "\uf1ea"
        },
        {
            title: "Search",
            route: "/search",
            icon: "\uf002"
        },
        {
            title: "Featured",
            route: "/featured",
            icon: "\uf005"
        },
        {
            title: "Settings",
            route: "/settings",
            icon: "\uf013"
        }
    ]

    constructor(private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
    }

    navigateToRoute(route:string): void {
        this.routerExtensions.navigate([route]);
    }

    isPageSelected(pageTitle:string): boolean {
        return pageTitle === this.selectedPage;
    }
}
