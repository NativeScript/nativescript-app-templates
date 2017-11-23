import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { CareCardService } from "../shared/care-card.service";

@Component({
    selector: "CareDashboard",
    moduleId: module.id,
    templateUrl: "./care-dashboard.component.html"
})
export class CareDashboardComponent implements OnInit {
    @Output() selectedDateChange = new EventEmitter<Date>();

    weeklyState: Array<any>;

    private _selectedDate: Date;

    constructor(private _careCardService: CareCardService) { }

    ngOnInit(): void {
        this.selectedDate = new Date();
        this.weeklyState = this._careCardService.getWeeklyOverview(this.selectedDate);
    }

    onItemTap(itemDate: Date): void {
        this.selectedDate = itemDate;
    }

    get selectedDate(): Date {
        return this._selectedDate;
    }

    set selectedDate(date: Date) {
        this._selectedDate = date;
        this.selectedDateChange.emit(date);
    }

    get selectedValue(): number {
        return this.weeklyState[this._selectedDate.getDay()].value;
    }
}
