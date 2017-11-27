import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import { CareCardService } from "../shared/care-card.service";

@Component({
    selector: "CareDashboard",
    moduleId: module.id,
    templateUrl: "./care-dashboard.component.html"
})
export class CareDashboardComponent implements OnInit, OnChanges {
    @Output() selectedDateChange = new EventEmitter<Date>();
    @Input() selectedDateValue: number;

    weeklyState: Array<any>;

    private _selectedDate: Date;

    constructor(private _careCardService: CareCardService) { }

    ngOnInit(): void {
        this.selectedDate = this._careCardService.selectedDate;
        this.weeklyState = this.getWeeklyOverview(this._selectedDate);

        this.weeklyState.forEach((weekItem) => {
            weekItem.value = this._careCardService.getOverviewValue(weekItem.date);
            console.log(weekItem.value);
        });
    }

    onItemTap(weekItem: any): void {
        this.selectedDate = weekItem.date;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedDateValue && changes.selectedDateValue.currentValue != null) {
            const newValue = changes.selectedDateValue.currentValue;
            this.updateWeekItemValue(this.selectedDate, newValue);
        }
    }

    get selectedDate(): Date {
        return this._selectedDate;
    }

    set selectedDate(date: Date) {
        this._selectedDate = date;
        this.selectedDateChange.emit(date);
        this._careCardService.selectedDate = date;
    }

    get selectedValue(): number {
        return this.weeklyState[this._selectedDate.getDay()].value;
    }

    private updateWeekItemValue(selectedDate: Date, value: number): void {
        const weekItemToUpdate = this.weeklyState.find((weekItem) => {
            return weekItem.date.toDateString() === selectedDate.toDateString();
        });

        if (weekItemToUpdate) {
            weekItemToUpdate.value = value;
        }
    }

    private getWeeklyOverview(selectedDate: Date): Array<any> {
        const sunday = this.getLastSunday(selectedDate);
        const monday = new Date(sunday);
        monday.setDate(sunday.getDate() + 1);

        const tuesday = new Date(sunday);
        tuesday.setDate(sunday.getDate() + 2);

        const wednesday = new Date(sunday);
        wednesday.setDate(sunday.getDate() + 3);

        const thursday = new Date(sunday);
        thursday.setDate(sunday.getDate() + 4);

        const friday = new Date(sunday);
        friday.setDate(sunday.getDate() + 5);

        const saturday = new Date(sunday);
        saturday.setDate(sunday.getDate() + 6);

        return [
            {
                date: sunday,
                value: 0
            },
            {
                date: monday,
                value: 0
            },
            {
                date: tuesday,
                value: 0
            },
            {
                date: wednesday,
                value: 0
            },
            {
                date: thursday,
                value: 0
            },
            {
                date: friday,
                value: 0
            },
            {
                date: saturday,
                value: 0
            }
        ];
    }

    private getLastSunday(date: Date): Date {
        const result = new Date(date);
        result.setDate(date.getDate() - date.getDay());

        return result;
    }
}
