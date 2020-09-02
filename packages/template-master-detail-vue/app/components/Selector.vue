<template>
    <GridLayout columns="*, auto" rows="*, *">
        <Label :text="type.toUpperCase()" class="car-list-odd" col="0" colSpan="2" row="0"/>
        <Label :text="selected" @tap="onSelectorTap" class="car-list-even" col="0" row="1"/>
        <Label @tap="onSelectorTap" class="fas car-list-even" col="1" row="1" text.decode="&#xf054;"/>
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
          props: {
            title: `Select Car ${this.type[0].toUpperCase() + this.type.substr(1)}`,
            items: constants[`${this.type}List`],
            selected: this.selected
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
