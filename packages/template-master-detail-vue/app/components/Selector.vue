<template>
    <GridLayout rows="*, *" columns="*, auto" @tap="onSelectorTap">
        <Label row="0" col="0" colSpan="2" :text="type.toUpperCase()" class="car-list-odd" />
        <Label row="1" col="0" :text="selected" class="car-list-even" @tap="onSelectorTap" />
        <Label row="1" col="1" text.decode="&#xf054;" class="fa text-secondary car-list-even" @tap="onSelectorTap" />
    </GridLayout>
</template>

<script>
    import * as constants from "~/shared/cars/constants";
    import selectorModal from "./SelectorModal";

    export default {
        name: "Selector",

        model: {
            prop: "text",
            event: "select"
        },

        props: ["type", "label", "text"],

        data() {
            return {
                selected: this.text
            }
        },

        methods: {
            onSelectorTap() {
                this.$showModal(selectorModal, {
                    context: {
                        propsData: {
                            title: `Select Car ${this.type[0].toUpperCase() + this.type.substr(1)}`,
                            items: constants[`${this.type}List`],
                            selected: this.selected
                        }
                    }
                }).then(selected => {
                    if (!selected) {
                        return;
                    }

                    this.selected = selected;

                    this.$emit("select", selected);
                });
            }
        },

        watch: {
            text(value) {
                this.selected = value;
            }
        }
    }
</script>
