import { Component, OnInit } from "@angular/core";

@Component({
    selector: "CareDashboard",
    moduleId: module.id,
    templateUrl: "./care-dashboard.component.html"
})
export class CareDashboardComponent implements OnInit {

    value: number = 30;

    values: Array<number> = [10, 20, 70, 100, 100, 0, 0];

    ngOnInit(): void {
        // OnInit
    }
}
