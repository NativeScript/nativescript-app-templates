<template>
    <Page>
        <ActionBar>
            <!-- HACK - we should remove the navigation button -->
            <NavigationButton visibility="collapsed" />
            <Label text="Edit Car Details" horizontalAlignment="center" />
           <ActionItem @tap="onCancelButtonTap" ios.position="left">
               <Label text="Cancel" verticalAlignment="center" />
           </ActionItem>
           <ActionItem ios.position="right">
               <Label text="Done" verticalAlignment="center" @tap="onDoneButtonTap"
                   :isEnabled="isModelValid"
                   :isUserInteractionEnabled="isModelValid" />
           </ActionItem>
        </ActionBar>

        <GridLayout>
            <ScrollView>
                <StackLayout class="car-list">
                    <Label text="CAR MAKE" class="car-list-odd" />
                    <TextField :text="carData.name" hint="Car make field is required"
                        :class="{ 'car-list-even': true, 'placeholder-error': !carData.name }" />

                    <GridLayout rows="*, 55, *" columns="*, auto" class="car-list-odd">
                        <Label text="PRICE PER DAY" />
                        <Label col="1" horizontalAlignment="right" class="car-list__value">
                            <FormattedString>
                                <Span text.decode="&euro;" />
                                <Span :text="carData.price" />
                            </FormattedString>
                        </Label>

                        <StackLayout row="1" colSpan="2" verticalAlignment="center">
                            <Slider v-model="carData.price" height="70" verticalAlignment="center" class="car-list-even" />
                        </StackLayout>

                        <Label text="ADD OR REMOVE IMAGE" row="2" colSpan="2" />
                    </GridLayout>

                    <AddRemoveImage v-model="carData.imageUrl" @select="isCarImageDirty = true"></AddRemoveImage>

                    <Selector type="class" v-model="carData.class"></Selector>

                    <Selector type="doors" v-model="carData.doors"></Selector>

                    <Selector type="seats" v-model="carData.seats"></Selector>

                    <Selector type="transmission" v-model="carData.transmission"></Selector>

                    <GridLayout orientation="horizontal" class="car-list-odd">
                        <Label text="LUGGAGE" />
                        <Label col="1" horizontalAlignment="right" class="car-list__value">
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
    @import '~@nativescript/theme/scss/variables/blue';

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

        &__value {
            width: 65;
            text-align: right;
            @include colorize($color: complementary);
        }

        TextField.placeholder-error {
            @include colorize($placeholder-color: error);
        }

        Slider {
            @include colorize($background-color: complementary);
            @include colorize($color: complementary);
        }
    }

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
