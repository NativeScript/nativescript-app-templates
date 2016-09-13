var Observable = require("data/observable").Observable;
var utilityModule = require("utils/utils");

function getMessage(counter) {
  if (counter <= 0) {
    return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
  } else {
    return counter + " taps left";
  }
}

function createViewModel(page) {
  var page = page;
  var viewModel = new Observable();
  viewModel.counter = 42;
  viewModel.message = getMessage(viewModel.counter);

  viewModel.onTap = function () {
    this.counter--;
    this.set("message", getMessage(this.counter));
  };

  viewModel.viewTheme = function () {
    page.showModal("modal", {
      url: "https://docs.nativescript.org/theme",
      title: "Theme Docs"
    }, function(data) {
      console.log("View model callback with: " + data);
    });
  };

  viewModel.viewNews = function () {
    page.showModal("modal", {
      url: "https://www.nativescript.org/nativescript-newsletter",
      title: "Newsletter"
    }, function (data) {
      console.log("View model callback with: " + data);
    });
  };

  viewModel.viewHelp = function () {
    page.showModal("modal", {
      url: "http://stackoverflow.com/questions/tagged/nativescript",
      title: "StackOverflow {N}"
    }, function(data) {
      console.log("View model callback with: " + data);
    });
  };

  return viewModel;
}

exports.createViewModel = createViewModel;