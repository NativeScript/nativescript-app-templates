var Observable = require("data/observable").Observable;

function createViewModel(page) {
  var page = page;
  var viewModel = new Observable();

  viewModel.viewTwitter = function () {
    page.showModal("modal", {
      url: "https://twitter.com/nativescript",
      title: "Twitter"
    }, function (data) {
      console.log("View model callback with: " + data);
    });
  };

  viewModel.viewHelp = function () {
    page.showModal("modal", {
      url: "https://stackoverflow.com/questions/tagged/nativescript",
      title: "Stack Overflow"
    }, function(data) {
      console.log("View model callback with: " + data);
    });
  };

  return viewModel;
}

exports.createViewModel = createViewModel;