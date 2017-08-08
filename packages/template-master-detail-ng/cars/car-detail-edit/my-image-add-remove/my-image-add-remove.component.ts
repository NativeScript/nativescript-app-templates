import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as imagePicker from "nativescript-imagepicker";

/* ***********************************************************
* The MyImageAddRemove custom component uses an imagepicker plugin to let the user select
* an image and provides custom logic and design to the process.
*************************************************************/
@Component({
    selector: "MyImageAddRemove",
    moduleId: module.id,
    templateUrl: "./my-image-add-remove.component.html",
    styleUrls: ["./my-image-add-remove.component.css"]
})
export class MyImageAddRemoveComponent {
    @Input() imageUrl: string = "";
    @Output() imageUrlChange = new EventEmitter<string>();

    onImageAddRemoveTap(): void {
        if (this.imageUrl) {
            this.handleImageChange(null);

            return;
        }

        const context = imagePicker.create({
            mode: "single"
        });

        context
            .authorize()
            .then(() => context.present())
            .then((selection) => selection.forEach(
                (selectedImage) => this.handleImageChange(selectedImage.fileUri))
            ).catch((errorMessage: any) => console.log(errorMessage));
    }

    handleImageChange(newValue): void {
        const oldValue = this.imageUrl;

        if (newValue) {
            // iOS simulator fileUri looks like file:///Users/...
            newValue = newValue.replace("file://", "");
        }

        if (oldValue === newValue) {
            return;
        }

        this.imageUrl = newValue;
        this.imageUrlChange.emit(this.imageUrl);
    }
}
