<template>
    <GridLayout rows="auto, *" columns="auto, *">
        <Label row="0" col="0" text="ADD OR REMOVE IMAGE" colSpan="2" class="car-list-odd" />

        <GridLayout row="1" col="0" height="80" width="80" class="thumb car-list-even" horizontalAlignment="left"
                    :backgroundImage="selectedImage" @tap="onImageAddRemoveTap">
            <Label text.decode="&#xf030;" class="fa thumb-add" v-show="!selectedImage"/>
            <Label text.decode="&#xf014;" class="fa thumb-remove" v-show="selectedImage" />
        </GridLayout>

        <Label v-if="!imageUrl" row="1" col="1" class="invalid-image" verticalAlignment="middle" text="Image field is required" />
    </GridLayout>
</template>

<script>
    import { Folder, knownFolders, path } from "file-system";
    import { ImageAsset } from "image-asset";
    import { fromAsset, ImageSource } from "image-source";
    import * as imagePicker from "nativescript-imagepicker";

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
                        selectedAsset => {
                            selectedAsset.options.height = 768;

                            fromAsset(selectedAsset)
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

<style scoped lang="scss">
    // Custom common variables
    @import '../app-variables';

    .page .thumb {
        background-size: cover;
        background-repeat: no-repeat;
        padding: 0;
        font-size: 25;
        font-weight: bold;

        Label {
            width: 100%;
            height: 100%;
            padding: 25 30;
        }

        .thumb-add {
            padding: 25;
            background-color: transparent;
            color: $blue-20;
            border-radius: $border-radius;
            border-width: $border-width;
            border-color: $blue-20;
        }

        .thumb-remove {
            color: $background-light;
            background-color: $blue-20;
        }
    }

    .invalid-image {
        margin-left: 10;
    }
</style>
