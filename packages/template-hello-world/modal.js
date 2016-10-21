var Observable = require("data/observable").Observable;
var WebView = require("ui/web-view").WebView;
var closeCallback;

function onLoaded(args) {
  var page = args.object;
  page.bindingContext = createViewModel();
}
exports.onLoaded = onLoaded;

function onShownModally(args) {
  console.log("Showing modal using URL: " + args.context.url);
  closeCallback = args.closeCallback;
  args.object.bindingContext.setTitle(args.context.title);
  args.object.bindingContext.setUrl(args.context.url);
}
exports.onShownModally = onShownModally;

function createViewModel() {
  var viewModel = new Observable();
  var url;
  
  viewModel.setTitle = function (url) {
    viewModel.set("title", url);
  }; 

  viewModel.setUrl = function (url) {
    url = url;
    viewModel.set("url", url);
  }; 

  viewModel.close = function () {
    closeCallback("Closed modal with URL: " + url);
  };

  return viewModel;
}
