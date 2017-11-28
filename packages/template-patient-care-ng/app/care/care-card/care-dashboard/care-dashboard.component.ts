import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { CareCardService } from "../shared/care-card.service";
import { CarePlanEvent } from "../shared/care-plan-event.model";

@Component({
    selector: "CareDashboard",
    moduleId: module.id,
    templateUrl: "./care-dashboard.component.html",
    styleUrls: ["./care-dashboard.component.css"]
})
export class CareDashboardComponent implements OnInit, OnDestroy {
    weeklyState: Array<any>;

    private _selectedDate: Date;
    private _dateSubscription: Subscription;
    private _eventSubscription: Subscription;

    constructor(private _careCardService: CareCardService) { }

    ngOnInit(): void {
        this.weeklyState = this.initializeWeeklyData();

        this._dateSubscription = this._careCardService.selectedDate$.subscribe((date: Date) => {
            this._selectedDate = date;
        });

        this._eventSubscription = this._careCardService.events$.subscribe((event: CarePlanEvent) => {
            // TODO: Is this check necessary?
            // TODO check why fired twice
            if (event && event.date.toDateString() === this._selectedDate.toDateString()) {
                const value = this._careCardService.getOverviewValue(this._selectedDate);
                this.updateWeekItemValue(this._selectedDate, value);
            }
        });
    }

    ngOnDestroy(): void {
        this._dateSubscription.unsubscribe();
        this._eventSubscription.unsubscribe();
    }

    get selectedDate(): Date {
        return this._selectedDate;
    }

    get selectedValue(): number {
        return this.weeklyState[this._selectedDate.getDay()].value;
    }

    initializeWeeklyData(): Array<any> {
        const data = this.getWeeklyOverview();
        data.forEach((weekItem) => {
            // TODO: getOverviewValue is not syncronous!
            weekItem.value = this._careCardService.getOverviewValue(weekItem.date);
        });

        return data;
    }

    onItemTap(weekItem: any): void {
        this._careCardService.updateSelectedDate(weekItem.date);
    }

    private updateWeekItemValue(selectedDate: Date, value: number): void {
        const weekItemToUpdate = this.weeklyState.find((weekItem) => {
            return weekItem.date.toDateString() === selectedDate.toDateString();
        });

        if (weekItemToUpdate) {
            weekItemToUpdate.value = value;
        }
    }

    private getWeeklyOverview(): Array<any> {
        const sunday = this.getLastSunday(new Date());
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
