import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Folder, knownFolders, path } from "file-system";
import { ImageSource } from "image-source";
import * as imagePicker from "nativescript-imagepicker";

const tempImageFolderName = "nsimagepicker";

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
    static get imageTempFolder(): Folder {
        return knownFolders.temp().getFolder(tempImageFolderName);
    }

    private static clearImageTempFolder(): void {
        MyImageAddRemoveComponent.imageTempFolder.clear();
    }

    @Input() imageUrl: string = "";
    @Output() imageUrlChange = new EventEmitter<string>();

    onImageAddRemoveTap(): void {
        if (this.imageUrl) {
            this.handleImageChange(null);

            return;
        }

        MyImageAddRemoveComponent.clearImageTempFolder();

        this.pickImage();
    }

    pickImage(): void {
        const context = imagePicker.create({
            mode: "single"
        });

        context
            .authorize()
            .then(() => context.present())
            .then((selection) => selection.forEach(
                (selectedAsset: imagePicker.SelectedAsset) => {
                    selectedAsset.getImage({ maxHeight: 768 })
                        .then((imageSource: ImageSource) => this.handleImageChange(imageSource));
                })
            ).catch((errorMessage: any) => console.log(errorMessage));
    }

    private handleImageChange(source: ImageSource): void {
        let raisePropertyChange = true;
        let tempImagePath = null;

        if (source) {
            tempImagePath = path.join(MyImageAddRemoveComponent.imageTempFolder.path, `${Date.now()}.jpg`);
            raisePropertyChange = source.saveToFile(tempImagePath, "jpeg");
        }

        if (raisePropertyChange) {
            this.imageUrl = tempImagePath;
            this.imageUrlChange.emit(this.imageUrl);
        }
    }
}
