import { Component, Input, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";

import { CarEditService } from "../../shared/car-edit.service";
import { ListSelectorModalViewComponent } from "./list-selector-modal-view.component";

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

@Component({
    moduleId: module.id,
    providers: [ModalDialogService],
    selector: "ListSelector",
    templateUrl: "./list-selector.component.html"
})
export class ListSelectorComponent {
    @Input() selectedValue: string;
    @Input() items: Array<string>;
    @Input() tag: string;

    constructor(
        private _modalService: ModalDialogService,
        private _vcRef: ViewContainerRef,
        private _carEditService: CarEditService) { }

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
                    this._carEditService.editObject[this.tag] = selectedValue;
                }
            });
    }
}
