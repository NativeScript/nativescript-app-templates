import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as imagePicker from "nativescript-imagepicker";
import * as permissions from "nativescript-permissions";
import * as platform from "tns-core-modules/platform";

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

        let queue = Promise.resolve();

        // lower SDK versions will grant permission from AndroidManifest file
        if (platform.device.os === "Android" && Number(platform.device.sdkVersion) >= 23) {
            queue = queue.then(() => permissions.requestPermission("android.permission.READ_EXTERNAL_STORAGE"));
        }

        queue.then(() => this.startSelection(context))
            .catch((errorMessage: any) => console.log(errorMessage));
    }

    startSelection(context): void {
        context
            .authorize()
            .then(() => context.present())
            .then((selection) => selection.forEach((selectedImage) => this.handleImageChange(selectedImage.fileUri)))
            .catch((errorMessage: any) => console.log(errorMessage));
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
