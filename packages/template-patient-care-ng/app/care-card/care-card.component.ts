import { Component, OnInit } from "@angular/core";

@Component({
    selector: "CareCard",
    moduleId: module.id,
    templateUrl: "./care-card.component.html"
})
export class CareCardComponent implements OnInit {

    value: number = 30;

    values: Array<number> = [10, 20, 70, 100, 100, 0, 0];

    ngOnInit(): void {
        // OnInit
    }
}
