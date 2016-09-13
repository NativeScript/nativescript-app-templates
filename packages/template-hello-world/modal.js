var Observable = require("data/observable").Observable;
var WebView = require("ui/web-view").WebView;
var closeCallback;

function onLoaded(args) {
  console.log("modal loaded.");
  let page = args.object;
  page.bindingContext = createViewModel();
}
exports.onLoaded = onLoaded;

function onShownModally(args) {
  console.log('modal using url: ' + args.context.url);
  closeCallback = args.closeCallback;
  args.object.bindingContext.setTitle(args.context.title);
  args.object.bindingContext.setUrl(args.context.url);
}
exports.onShownModally = onShownModally;

function createViewModel() {
  var viewModel = new Observable();
  var url;
  
  viewModel.setTitle = function (url) {
    viewModel.set('title', url);
  }; 

  viewModel.setUrl = function (url) {
    url = url;
    viewModel.set('url', url);
  }; 

  viewModel.close = function () {
    closeCallback("closed modal which had " + url + " loaded.");
  };

  return viewModel;
}
