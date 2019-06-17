import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { CareCardEventService } from "../shared/care-card-event.service";
import { CareCardService } from "../shared/care-card.service";
import { CarePlanEvent } from "../shared/care-plan-event.model";

@Component({
    selector: "CareDashboard",
    moduleId: module.id,
    templateUrl: "./care-dashboard.component.html",
    styleUrls: ["./care-dashboard.component.css", "../../care-common.css"]
})
export class CareDashboardComponent implements OnInit, OnDestroy {
    weeklyState: Array<any>;

    private _selectedDate: Date;
    private _dateSubscription: Subscription;
    private _eventSubscription: Subscription;

    constructor(
        private _careCardService: CareCardService,
        private _careCardEventService: CareCardEventService) { }

    ngOnInit(): void {
        this.weeklyState = this.initializeWeeklyData();

        this._dateSubscription = this._careCardService.selectedDate$.subscribe((date: Date) => {
            this._selectedDate = date;
        });

        this._eventSubscription = this._careCardEventService.updatedEvent$.subscribe((event: CarePlanEvent) => {
            // TODO: reconsider how to trigger this one-time operation
            // one option is a separate listener for eventService.getEvents()
            if (!event) {
                this.weeklyState.forEach((weekItem) => {
                    this._careCardService.getOverviewValue(weekItem.date).then((value) => {
                        this.updateWeekItemValue(weekItem.date, value);
                    });
                });

                return;
            }

            if (event.date.toDateString() === this._selectedDate.toDateString()) {
                this._careCardService.getOverviewValue(this._selectedDate).then((value) => {
                    this.updateWeekItemValue(this._selectedDate, value);
                });
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
            this._careCardService.getOverviewValue(weekItem.date).then((value) => {
                weekItem.value = value;
            });
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
        const sunday = this.getPreviousSunday(new Date());
        const result = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(sunday);
            date.setDate(sunday.getDate() + i);

            result.push({
                date,
                value: 0
            });
        }

        return result;
    }

    private getPreviousSunday(date: Date): Date {
        const result = new Date(date);
        result.setDate(date.getDate() - date.getDay());

        return result;
    }
}
