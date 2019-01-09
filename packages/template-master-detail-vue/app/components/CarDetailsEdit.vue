<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'Edit ' + carData.name" horizontalAlignment="center" />
           <ActionItem @tap="onCancelButtonTap" position="left">
               <Label text="Cancel" verticalAlignment="center" class="action-item" />
           </ActionItem>
           <ActionItem position="right">
               <Label text="Done" class="action-item" verticalAlignment="center" @tap="onDoneButtonTap"
                   :isEnabled="isModelValid"
                   :isUserInteractionEnabled="isModelValid" />
           </ActionItem>
        </ActionBar>

        <GridLayout class="page">
            <ScrollView>
                <StackLayout class="car-list">
                    <Label text="CAR MAKE" class="car-list-odd" />
                    <TextField :text="carData.name" hint="Car make field is required"
                        :class="{ [carData.name]: true, [carData.name ? 'car-list-even' : 'car-list-even invalid-text']: true }" />

                    <StackLayout class="car-list-odd" orientation="horizontal">
                        <Label text="PRICE PER DAY" />
                        <Label col="1" horizontalAlignment="right" class="text-primary car-list-price">
                            <FormattedString>
                                <Span text.decode="&euro;" />
                                <Span :text="carData.price" />
                            </FormattedString>
                        </Label>
                    </StackLayout>

                    <Slider v-model="carData.price" height="70" verticalAlignment="center" class="car-list-even" />

                    <AddRemoveImage v-model="carData.imageUrl" @select="isCarImageDirty = true"></AddRemoveImage>

                    <Selector type="class" v-model="carData.class"></Selector>

                    <Selector type="doors" v-model="carData.doors"></Selector>

                    <Selector type="seats" v-model="carData.seats"></Selector>

                    <Selector type="transmission" v-model="carData.transmission"></Selector>

                    <GridLayout orientation="horizontal" class="car-list-odd">
                        <Label text="LUGGAGE" />
                        <Label col="1" horizontalAlignment="right" class="text-primary">
                            <FormattedString>
                                <Span :text="carData.luggage" />
                                <Span text=" Bag(s)" />
                            </FormattedString>
                        </Label>
                    </GridLayout>

                    <Slider minValue="0" maxValue="5" height="70" v-model="carData.luggage" class="car-list-even" verticalAlignment="center" />
                </StackLayout>
            </ScrollView>

            <ActivityIndicator :busy="isUpdating"></ActivityIndicator>
        </GridLayout>
    </Page>
</template>

<script>
    import { alert } from "ui/dialogs";
    import carService from "~/shared/cars/car-service";
    import CarList from "./CarList";
    import Selector from "./Selector";
    import AddRemoveImage from "./AddRemoveImage";

    export default {
        components: {
            AddRemoveImage,
            Selector
        },

        props: ["car"],

        data() {
            return {
                isCarImageDirty: false,
                isUpdating: false
            };
        },

        computed: {
            isModelValid() {
                return !!this.carData.name && !!this.carData.imageUrl;
            },

            carData() {
                return this.car || {};
            }
        },

        methods: {
            onCancelButtonTap() {
                this.$navigateBack();
            },

            onDoneButtonTap() {
                /* ***********************************************************
                * By design this app is set up to work with read-only sample data.
                * Follow the steps in the "Firebase database setup" section in app/readme.md file
                * and uncomment the code block below to make it editable.
                *************************************************************/

                /* ***********************************************************
                let queue = Promise.resolve();
                this.isUpdating = true;

                if (this.isCarImageDirty && this.carData.imageUrl) {
                    queue = queue
                        .then(() => carService.uploadImage(this.carData.imageStoragePath, this.carData.imageUrl))
                        .then((uploadedFile) => {
                            this.carData.imageUrl = uploadedFile.url;
                        });
                }

                queue.then(() => carService.update(this.carData))
                    .then(() => {
                        this.isUpdating = false;
                        this.isCarImageDirty = false;

                    this.$navigateTo(CarList, {
                        animated: true,
                        clearHistory: true,
                        transition: {
                            name: "slideBottom",
                            duration: 200,
                            curve: "ease"
                        }
                    });
                    })
                    .catch((errorMessage) => {
                        this.isUpdating = false;

                        alert({ title: "Oops!", message: errorMessage, okButtonText: "Ok" });
                    });
                *************************************************************/

                /* ***********************************************************
                * Comment out the code block below if you made the app editable.
                *************************************************************/
                alert({
                    title: "Read-Only Template!",
                    message: `Check out the "Firebase database setup" section in the readme file to make it editable.`,
                    okButtonText: "Ok"
                }).then(() => {
                    this.$navigateTo(CarList, {
                        animated: true,
                        clearHistory: true,
                        transition: {
                            name: "slideBottom",
                            duration: 200,
                            curve: "ease"
                        }
                    });
                });
            }
        }
    };
</script>

<style lang="scss">
    // Custom common variables
    @import '../app-variables';

    // Custom styles
    .car-list {

        .car-list-even,
        .car-list-odd {
            padding: 10 15;
            border-bottom-width: $border-width;
            border-color: $blue-20;
        }

        .car-list-odd {
            background-color: $blue-10;
            color: $blue-50;
        }

        .text-secondary {
            horizontal-alignment: right;
            vertical-alignment: center;
        }

        .car-list-price {
            width: 35;
            text-align: right;
        }

        TextField.invalid-text {
            placeholder-color: $error;
        }

        .invalid-image {
            color: $error;
        }
    }
</style>
