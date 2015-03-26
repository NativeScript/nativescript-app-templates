var observable = require("data/observable");

var counter = 42;

var mainViewModel = new observable.Observable();
mainViewModel.set("message", counter + " taps left");
mainViewModel.tapAction = function () {
   counter--;
   if (counter <= 0) {
     mainViewModel.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
   }
   else {
     mainViewModel.set("message", counter + " taps left");
   }
};
exports.mainViewModel = mainViewModel;