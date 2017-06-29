import { Component, Input, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { PageRoute } from "nativescript-angular/router";

import { Car } from "../../shared/car.model";
import { CarService } from "../../shared/car.service";
import { ListSelectorModalViewComponent } from "./list-selector-modal-view.component";

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* ***********************************************************
* The ListSelector custom component uses a {N} modal page to let the user select and option
* from a list. You can also check out the list-selector-modal-view.component.ts to see the
* contents of the modal page. Learn more about modal pages in this documentation article:
* https://docs.nativescript.org/angular/code-samples/modal-page
*************************************************************/
@Component({
    moduleId: module.id,
    providers: [ModalDialogService],
    selector: "ListSelector",
    templateUrl: "./list-selector.component.html"
})
export class ListSelectorComponent implements OnInit {
    @Input() selectedValue: string;
    @Input() items: Array<string>;
    @Input() tag: string;

    private _car: Car;

    constructor(
        private _pageRoute: PageRoute,
        private _modalService: ModalDialogService,
        private _vcRef: ViewContainerRef,
        private _carService: CarService) { }

    ngOnInit(): void {
        let carId = "";

        // use switchMap to get the latest activatedRoute instance
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                carId = params.id;
            });

        this._car = this._carService.getCarById(carId);
    }

    onSelectorTap(): void {
        const title = `Select Car ${capitalizeFirstLetter(this.tag)}`;
        const selectedIndex = this.items.indexOf(this.selectedValue);
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {
                items: this.items,
                title,
                selectedIndex
            },
            fullscreen: false
        };

        this._modalService.showModal(ListSelectorModalViewComponent, options)
            .then((selectedValue: string) => {
                if (selectedValue) {
                    this._car[this.tag] = selectedValue;
                }
            });
    }
}
