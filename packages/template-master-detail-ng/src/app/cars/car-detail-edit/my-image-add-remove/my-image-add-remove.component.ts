import { Component, forwardRef, Input, Output } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import * as imagePicker from '@nativescript/imagepicker'
import { Folder, knownFolders, path, ImageAsset, ImageSource } from '@nativescript/core'

const tempImageFolderName = 'nsimagepicker'
const noop = () => {}

const MY_IMAGE_ADD_REMOVE_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MyImageAddRemoveComponent),
  multi: true,
}

/* ***********************************************************
 * The MyImageAddRemove custom component uses an imagepicker plugin to let the user select
 * an image and provides custom logic and design to the process.
 *************************************************************/
@Component({
  selector: 'MyImageAddRemove',
  templateUrl: './my-image-add-remove.component.html',
  styleUrls: ['./my-image-add-remove.component.scss'],
  providers: [MY_IMAGE_ADD_REMOVE_CONTROL_VALUE_ACCESSOR],
})
export class MyImageAddRemoveComponent implements ControlValueAccessor {
  static get imageTempFolder(): Folder {
    return knownFolders.temp().getFolder(tempImageFolderName)
  }

  private static clearImageTempFolder(): void {
    MyImageAddRemoveComponent.imageTempFolder.clear()
  }

  // placeholder for the callback later provided by the ControlValueAccessor
  private propagateChange: (_: any) => void = noop

  private innerImageUrl: string = ''

  get imageUrl(): string {
    return this.innerImageUrl
  }

  set imageUrl(value: string) {
    if (this.innerImageUrl !== value) {
      this.innerImageUrl = value
      this.propagateChange(value)
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string) {
    if (this.innerImageUrl !== value) {
      this.innerImageUrl = value
    }
  }

  // ControlValueAccessor implementation
  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  // ControlValueAccessor implementation
  registerOnTouched(fn: any): void {}

  onImageAddRemoveTap(): void {
    if (this.imageUrl) {
      this.handleImageChange(null)

      return
    }

    MyImageAddRemoveComponent.clearImageTempFolder()

    this.pickImage()
  }

  pickImage(): void {
    const context = imagePicker.create({
      mode: 'single',
    })

    context
      .authorize()
      .then(() => context.present())
      .then((selection) =>
        selection.forEach((selectedAsset: ImageAsset) => {
          selectedAsset.options.height = 768
          ImageSource.fromAsset(selectedAsset).then((imageSource: ImageSource) =>
            this.handleImageChange(imageSource)
          )
        })
      )
      .catch((errorMessage: any) => console.log(errorMessage))
  }

  private handleImageChange(source: ImageSource): void {
    let raisePropertyChange = true
    let tempImagePath = null

    if (source) {
      tempImagePath = path.join(MyImageAddRemoveComponent.imageTempFolder.path, `${Date.now()}.jpg`)
      raisePropertyChange = source.saveToFile(tempImagePath, 'jpeg')
    }

    if (raisePropertyChange) {
      this.imageUrl = tempImagePath
    }
  }
}
