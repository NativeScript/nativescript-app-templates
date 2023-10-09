<template>
    <StackLayout class="car-list-even">
        <GridLayout :backgroundImage="selectedImage" @tap="onImageAddRemoveTap" class="thumb" height="80"
                    horizontalAlignment="left" width="80">
            <GridLayout class="thumb__add" v-show="!selectedImage">
                <Label class="fas" horizontalAlignment="center" text.decode="&#xf030;" verticalAlignment="center"/>
            </GridLayout>
            <GridLayout class="thumb__remove" v-show="selectedImage">
                <Label class="far" horizontalAlignment="center" text.decode="&#xf2ed;" verticalAlignment="center"/>
            </GridLayout>
        </GridLayout>

        <Label col="1" row="1" text="Image field is required" v-if="!imageUrl" verticalAlignment="middle"/>
    </StackLayout>
</template>

<script>
  import {knownFolders, path, ImageSource} from "@nativescript/core";
  import * as imagePicker from "@nativescript/imagepicker";

  const tempImageFolderName = "nsimagepicker";

  export default {
    name: "AddRemoveImage",

    model: {
      prop: "image-url",
      event: "select"
    },

    props: ["image-url"],

    data() {
      return {
        selectedImage: this.imageUrl,
        imageTempFolder: knownFolders.temp().getFolder(tempImageFolderName)
      }
    },

    methods: {
      onImageAddRemoveTap() {
        if (this.selectedImage) {
          return this.handleImageChange(null);
        }

        this.imageTempFolder.clear();

        this.pickImage();
      },

      pickImage() {
        const context = imagePicker.create({
          mode: "single"
        });

        context
          .authorize()
          .then(() => context.present())
          .then(selection => selection.forEach(
            result => {
              result.asset.options.height = 768;

              ImageSource.fromAsset(result.asset)
                .then(imageSource => this.handleImageChange(imageSource));
            }))
          .catch((errorMessage) => console.log(errorMessage));
      },

      handleImageChange(source) {
        if (source) {
          const tempImagePath = path.join(this.imageTempFolder.path, `${Date.now()}.jpg`);

          if (source.saveToFile(tempImagePath, "jpeg")) {
            this.selectedImage = tempImagePath;
          }
        } else {
          this.selectedImage = null;
        }

        this.$emit("select", this.selectedImage);
      }
    },

    watch: {
      imageUrl(value) {
        this.selectedImage = value;
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .car-list {

        &-even,
        &-odd {
            padding: 10 15;
            margin: 0;
            border-bottom-width: const(border-width);
            @include colorize($border-color: background-alt-20);
        }

        &-odd {
            @include colorize($background-color: background-alt-10);
            @include colorize($color: secondary);
        }
    }

    // Custom styles
    .thumb {
        background-size: cover;
        background-repeat: no-repeat;
        font-size: 25;
        font-weight: bold;

        &__add {
            background-color: transparent;
            border-radius: const(border-radius-sm);
            border-width: const(border-width);
            @include colorize(
                    $border-color: background-alt-20,
                    $color: background-alt-20
            );
        }

        &__remove {
            background-color: rgba(grey, 0.5);
            @include colorize($color: background);
        }
    }
</style>
