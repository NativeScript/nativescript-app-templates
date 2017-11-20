import { Component, OnInit } from "@angular/core";

@Component({
    selector: "CareDashboard",
    moduleId: module.id,
    templateUrl: "./care-dashboard.component.html"
})
export class CareDashboardComponent implements OnInit {

    careState: Array<any>;
    selectedState: any;

    ngOnInit(): void {
        this.careState = this.getCareState();
        this.selectedState = this.careState[new Date().getDay()];
    }

    onItemTap(itemDate: Date): void {
        this.selectedState = this.careState[itemDate.getDay()];
    }

    // TODO: Extract when we have an idea of the CareKit Kinvey backend
    private getCareState(): Array<any> {
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
                value: 10
            },
            {
                date: monday,
                value: 20
            },
            {
                date: tuesday,
                value: 70
            },
            {
                date: wednesday,
                value: 100
            },
            {
                date: thursday,
                value: 100
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
