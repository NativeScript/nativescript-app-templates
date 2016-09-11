var Observable = require("data/observable").Observable;
var utilityModule = require("utils/utils");

function getMessage(counter) {
  if (counter <= 0) {
    return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
  } else {
    return counter + " taps left";
  }
}

function createViewModel() {
  var viewModel = new Observable();
  viewModel.counter = 42;
  viewModel.message = getMessage(viewModel.counter);

  viewModel.onTap = function () {
    this.counter--;
    this.set("message", getMessage(this.counter));
  };

  viewModel.viewDocs = function () {
    utilityModule.openUrl("https://docs.nativescript.org/ui/components");
  };

  viewModel.viewThemeDocs = function () {
    utilityModule.openUrl("https://github.com/NativeScript/theme/wiki/Class-Names");
  };

  return viewModel;
}

exports.createViewModel = createViewModel;