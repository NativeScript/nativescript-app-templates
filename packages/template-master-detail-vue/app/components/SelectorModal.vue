<template>
    <GridLayout rows="auto, *, auto" verticalAlignment="top" ios:class="modal-input -ios" android:class="modal-input -android">
        <Label :text="title" class="h3 modal-input__header"></Label>
        <RadListView row="1" :items="source" @itemTap="itemSelected" selectionBehavior="Press" class="modal-input__list">
            <v-template>
                <GridLayout>
                    <GridLayout android:visibility="collapsed" columns="*,auto" class="modal-input__list-item">
                        <Label :text="item.value"></Label>
                        <Label col="1" text.decode="&#xf00c;"
                            class="fas modal-input__list-check"
                            v-show="item.value === selectedValue"></Label>
                    </GridLayout>
                    <GridLayout ios:visibility="collapsed" columns="auto,*" class="modal-input__list-item">
                        <Label text.decode="&#xf111;"
                            class="far modal-input__list-icon" verticalAlignment="center"
                            v-show="item.value !== selectedValue"></Label>
                        <Label text.decode="&#xf192;"
                            class="far modal-input__list-icon selected" verticalAlignment="center"
                            v-show="item.value === selectedValue"></Label>
                        <Label col="1" :text="item.value"></Label>
                    </GridLayout>
                </GridLayout>
            </v-template>
        </RadListView>
        <Button class="-outline" row="3" text="CANCEL" ios:visibility="collapsed" horizontalAlignment="right" @tap="$modal.close()"></Button>
    </GridLayout>
</template>

<script>
    export default {
        name: "SelectorModal",

        props: ["title", "items", "selected"],

        data() {
            return {
                source: this.items.map((value, index) => ({ index, value })),
                selectedValue: this.selected
            };
        },

        methods: {
            itemSelected(e) {
                this.selectedValue = e.item.value;

                this.$modal.close(this.selectedValue);
            }
        }
    }
</script>

<style lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .modal-input {
        @include colorize(
            $background-color: background-alt-10,
            $color: text-color
        );

        &__list-item {
            vertical-align: center;
        }
    }

    .modal-input.-android {

        &__header {
            padding: 15;
        }

        &__list-item {
            padding: 0 15 10 15;
        }

        &__list-icon {
            margin-right: 15;
            margin-top: 2;

            &.selected {
                @include colorize($color: accent);
            }
        }

        Button.-outline {
            android-elevation: 0;
            background-color: transparent;
            border-color: transparent;
            @include colorize($color: accent);
            font-size: 12;
            padding-right: 0;
            text-align: right;
        }
    }

    .modal-input.-ios {
        height: 100%;
        padding-top: 20;

        &__list {
            border-top-width: const(border-width);
            @include colorize($border-color: background-alt-20);

            &-item {
                border-bottom-width: const(border-width);
                @include colorize(
                    $background-color: background,
                    $border-color: background-alt-20
                );
            }

            &-check {
                @include colorize($color: accent);
            }
        }
    }
</style>
