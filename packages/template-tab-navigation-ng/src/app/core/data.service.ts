import { Injectable } from "@angular/core";

export interface IDataItem {
    id: number;
    name: string;
    description: string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {

    private items = new Array<IDataItem>(
        {
            id: 1,
            name: "Item 1",
            description: "Description for Item 1"
        },
        {
            id: 2,
            name: "Item 2",
            description: "Description for Item 2"
        },
        {
            id: 3,
            name: "Item 3",
            description: "Description for Item 3"
        },
        {
            id: 4,
            name: "Item 4",
            description: "Description for Item 4"
        },
        {
            id: 5,
            name: "Item 5",
            description: "Description for Item 5"
        },
        {
            id: 6,
            name: "Item 6",
            description: "Description for Item 6"
        },
        {
            id: 7,
            name: "Item 7",
            description: "Description for Item 7"
        },
        {
            id: 8,
            name: "Item 8",
            description: "Description for Item 8"
        },
        {
            id: 9,
            name: "Item 9",
            description: "Description for Item 9"
        },
        {
            id: 10,
            name: "Item 10",
            description: "Description for Item 10"
        },
        {
            id: 11,
            name: "Item 11",
            description: "Description for Item 11"
        },
        {
            id: 12,
            name: "Item 12",
            description: "Description for Item 12"
        },
        {
            id: 13,
            name: "Item 13",
            description: "Description for Item 13"
        },
        {
            id: 14,
            name: "Item 14",
            description: "Description for Item 14"
        },
        {
            id: 15,
            name: "Item 15",
            description: "Description for Item 15"
        },
        {
            id: 16,
            name: "Item 16",
            description: "Description for Item 16"
        }
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
