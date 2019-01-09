import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { PageRoute } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";

import { CarEditService } from "../../shared/car-edit.service";
import { Car } from "../../shared/car.model";
import { MyListSelectorModalViewComponent } from "./my-list-selector-modal-view.component";

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* ***********************************************************
* The MyListSelector custom component uses a {N} modal page to let the user select and option
* from a list. You can also check out the my-list-selector-modal-view.component.ts to see the
* contents of the modal page. Learn more about modal pages in this documentation article:
* https://docs.nativescript.org/angular/code-samples/modal-page
*************************************************************/
@Component({
    moduleId: module.id,
    providers: [ModalDialogService],
    selector: "MyListSelector",
    templateUrl: "./my-list-selector.component.html"
})
export class MyListSelectorComponent implements OnInit {
    @Input() tag: string;
    @Input() items: Array<string>;
    @Input() selectedValue: string;
    @Output() selectedValueChange = new EventEmitter<string>();

    private _carEditModel: Car;

    constructor(
        private _pageRoute: PageRoute,
        private _modalService: ModalDialogService,
        private _vcRef: ViewContainerRef,
        private _carEditService: CarEditService) { }

    ngOnInit(): void {
        let carId = "";

        // use switchMap to get the latest activatedRoute instance
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                carId = params.id;
            });

        this._carEditModel = this._carEditService.getEditableCarById(carId);
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

        this._modalService.showModal(MyListSelectorModalViewComponent, options)
            .then((selectedValue: string) => {
                if (selectedValue) {
                    this.selectedValue = selectedValue;
                    this.selectedValueChange.emit(this.selectedValue);
                }
            });
    }
}
