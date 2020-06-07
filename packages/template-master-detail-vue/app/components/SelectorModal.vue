<template>
    <GridLayout android:class="modal-input -android"
                ios:class="modal-input -ios"
                rows="auto, *, auto"
                verticalAlignment="top">
        <Label :text="title" class="h3 modal-input__header"/>
        <RadListView :items="source" @itemTap="itemSelected" class="modal-input__list" row="1"
                     selectionBehavior="Press">
            <v-template>
                <GridLayout>
                    <GridLayout android:visibility="collapsed" class="modal-input__list-item" columns="*,auto">
                        <Label :text="item.value"></Label>
                        <Label class="fas modal-input__list-check" col="1"
                               text.decode="&#xf00c;"
                               v-show="item.value === selectedValue"/>
                    </GridLayout>
                    <GridLayout class="modal-input__list-item" columns="auto,*" ios:visibility="collapsed">
                        <Label class="far modal-input__list-icon"
                               text.decode="&#xf111;" v-show="item.value !== selectedValue"
                               verticalAlignment="center"/>
                        <Label class="far modal-input__list-icon selected"
                               text.decode="&#xf192;" v-show="item.value === selectedValue"
                               verticalAlignment="center"/>
                        <Label :text="item.value" col="1"/>
                    </GridLayout>
                </GridLayout>
            </v-template>
        </RadListView>
        <Button @tap="$modal.close()"
                class="-outline"
                horizontalAlignment="right"
                ios:visibility="collapsed"
                row="3"
                text="CANCEL"/>
    </GridLayout>
</template>

<script>
  export default {
    name: "SelectorModal",

    props: ["title", "items", "selected"],

    data() {
      return {
        source: this.items.map((value, index) => ({index, value})),
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
                @include colorize($color: complementary);
            }
        }

        Button.-outline {
            android-elevation: 0;
            background-color: transparent;
            border-color: transparent;
            @include colorize($color: complementary);
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
                @include colorize($color: complementary);
            }
        }
    }
</style>
