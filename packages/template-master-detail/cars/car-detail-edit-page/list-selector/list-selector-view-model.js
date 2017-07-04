const Observable = require("data/observable").Observable;
const ObservableArray = require("data/observable-array").ObservableArray;
const { carClassList, carDoorList, carSeatList, carTransmissionList } = require("./constants");

function ListSelectorViewModel(context, closeCallback) {
    const viewModel = new Observable();

    viewModel._closeCallback = closeCallback;
    viewModel.title = `Select Car ${capitalizeFirstLetter(context.tag)}`;

    const protoItems = resolveProtoItems(context.tag);
    viewModel._selectedIndex = protoItems.indexOf(context.selectedValue);

    viewModel.items = new ObservableArray([]);
    for (let i = 0; i < protoItems.length; i++) {
        viewModel.items.push({
            value: protoItems[i],
            isSelected: i === viewModel._selectedIndex ? true : false
        });
    }

    viewModel.selectItem = function (newSelectedIndex) {
        const oldSelectedItem = this.items.getItem(this._selectedIndex);
        oldSelectedItem.isSelected = false;

        const newSelectedItem = this.items.getItem(newSelectedIndex);
        newSelectedItem.isSelected = true;
        this._selectedIndex = newSelectedIndex;

        this._closeCallback(newSelectedItem.value);
    };

    viewModel.cancelSelection = function () {
        this._closeCallback(null);
    };

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
