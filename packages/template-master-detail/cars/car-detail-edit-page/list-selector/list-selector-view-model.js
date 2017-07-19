const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const { carClassList, carDoorList, carSeatList, carTransmissionList } = require("./constants");

function ListSelectorViewModel(context, closeCallback) {
    const protoItems = resolveProtoItems(context.tag);
    const selectedIndex = protoItems.indexOf(context.selectedValue);
    const items = new ObservableArray([]);

    for (let i = 0; i < protoItems.length; i++) {
        items.push({
            value: protoItems[i],
            isSelected: i === selectedIndex ? true : false
        });
    }

    const viewModel = observableModule.fromObject({
        items: items,
        title: `Select Car ${capitalizeFirstLetter(context.tag)}`,
        _closeCallback: closeCallback,
        _selectedIndex: selectedIndex,

        cancelSelection: function () {
            this._closeCallback(null);
        },

        selectItem: function (newSelectedIndex) {
            const oldSelectedItem = this.items.getItem(this._selectedIndex);
            oldSelectedItem.isSelected = false;

            const newSelectedItem = this.items.getItem(newSelectedIndex);
            newSelectedItem.isSelected = true;
            this._selectedIndex = newSelectedIndex;

            this._closeCallback(newSelectedItem.value);
        }
    });

    return viewModel;
}

function resolveProtoItems(tag) {
    switch (tag) {
    case "class":
        return carClassList;
    case "doors":
        return carDoorList;
    case "seats":
        return carSeatList;
    case "transmission":
        return carTransmissionList;
    default:
        throw new Error("Unrecognized tag");
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = ListSelectorViewModel;
