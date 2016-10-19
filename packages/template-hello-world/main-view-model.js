var Observable = require("data/observable").Observable;

function createViewModel(page) {
  var page = page;
  var viewModel = new Observable();

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
      url: "https://stackoverflow.com/questions/tagged/nativescript",
      title: "StackOverflow {N}"
    }, function(data) {
      console.log("View model callback with: " + data);
    });
  };

  return viewModel;
}

exports.createViewModel = createViewModel;