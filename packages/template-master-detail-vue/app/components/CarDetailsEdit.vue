<template>
    <Page>
        <ActionBar>
            <!-- HACK - we should remove the navigation button -->
            <NavigationButton visibility="collapsed"/>
            <Label horizontalAlignment="center" text="Edit Car Details"/>
            <ActionItem @tap="onCancelButtonTap" ios.position="left">
                <Label text="Cancel" verticalAlignment="center"/>
            </ActionItem>
            <ActionItem ios.position="right">
                <Label :isEnabled="isModelValid" :isUserInteractionEnabled="isModelValid" @tap="onDoneButtonTap"
                       text="Done"
                       verticalAlignment="center"/>
            </ActionItem>
        </ActionBar>

        <GridLayout>
            <ScrollView>
                <StackLayout class="car-list">
                    <Label class="car-list-odd" text="CAR MAKE"/>
                    <TextField :class="{ 'car-list-even': true, 'placeholder-error': !carData.name }" :text="carData.name"
                               hint="Car make field is required"/>

                    <GridLayout class="car-list-odd" columns="*, auto" rows="*, 55, *">
                        <Label text="PRICE PER DAY"/>
                        <Label class="car-list__value" col="1" horizontalAlignment="right">
                            <FormattedString>
                                <Span text.decode="&euro;"/>
                                <Span :text="carData.price"/>
                            </FormattedString>
                        </Label>

                        <StackLayout colSpan="2" row="1" verticalAlignment="center">
                            <Slider class="car-list-even" height="70" v-model="carData.price"
                                    verticalAlignment="center"/>
                        </StackLayout>

                        <Label colSpan="2" row="2" text="ADD OR REMOVE IMAGE"/>
                    </GridLayout>

                    <AddRemoveImage @select="isCarImageDirty = true" v-model="carData.imageUrl"/>

                    <Selector type="class" v-model="carData.class"/>

                    <Selector type="doors" v-model="carData.doors"/>

                    <Selector type="seats" v-model="carData.seats"/>

                    <Selector type="transmission" v-model="carData.transmission"/>

                    <GridLayout class="car-list-odd" orientation="horizontal">
                        <Label text="LUGGAGE"/>
                        <Label class="car-list__value" col="1" horizontalAlignment="right">
                            <FormattedString>
                                <Span :text="carData.luggage"/>
                                <Span text=" Bag(s)"/>
                            </FormattedString>
                        </Label>
                    </GridLayout>

                    <Slider class="car-list-even" height="70" maxValue="5" minValue="0" v-model="carData.luggage"
                            verticalAlignment="center"/>
                </StackLayout>
            </ScrollView>

            <ActivityIndicator :busy="isUpdating"/>
        </GridLayout>
    </Page>
</template>

<script>
  import {alert} from "ui/dialogs";
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
            @include colorize(
                    $background-color: background-alt-10,
                    $color: secondary
            );
        }

        &__value {
            width: 65;
            text-align: right;
            @include colorize($contrasted-color: complementary background 30% 10%);
        }

        TextField.placeholder-error {
            @include colorize($placeholder-color: error);
        }

        Slider {
            @include colorize(
                    $contrasted-background-color: complementary background 20% 0%,
                    $contrasted-color: complementary background 20% 0%
            );
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
