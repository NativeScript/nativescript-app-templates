import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as platform from "tns-core-modules/platform";
import * as imagePicker from "nativescript-imagepicker";
import * as permissions from "nativescript-permissions";

const faPlusIcon = "\uf067";
const faThrashIcon = "\uf014"

@Component({
    selector: "ImageAddRemove",
    moduleId: module.id,
    templateUrl: "./image-add-remove.component.html",
    styleUrls: ["./image-add-remove.component.css"]
})
export class ImageAddRemoveComponent {
    @Input() imageUrl: string;
    @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

    private _addRemoveText: string;

    constructor() {
        this._addRemoveText = faThrashIcon;
    }

    onImageAddRemoveTap(): void {
        if (this.imageUrl) {
            this._addRemoveText = faPlusIcon;
            this.handleImageChange(null);

            return;
        }

        this._addRemoveText = faThrashIcon;

        let context = imagePicker.create({
            mode: "single"
        });

        let self = this;
        let queue = Promise.resolve();

        // lower SDK versions will grant permission from AndroidManifest file
        if (platform.device.os === "Android" && Number(platform.device.sdkVersion) >= 23) {
            queue = queue.then(function () {
                return permissions.requestPermission("android.permission.READ_EXTERNAL_STORAGE");
            });
        }

        queue.then(function () {
            self.startSelection(context);
        }).catch(function (errorMessage: any) {
            console.log(errorMessage);
        });
    }

    startSelection(context): void {
        context
            .authorize()
            .then(() => context.present())
            .then((selection) => {
                if (selection && selection.length) {
                    this.handleImageChange(selection[0].fileUri);
                }
            }).catch(function (errorMessage: any) {
                console.log(errorMessage);
            });
    }

    handleImageChange(newValue): void {
        let oldValue = this.imageUrl;
        if (oldValue === newValue) {
            return;
        }

        this.imageUrl = newValue;
        this.selectionChanged.emit({ oldValue: oldValue, newValue: newValue });
    }

    get addRemoveText(): string {
        return this._addRemoveText;
    }
}