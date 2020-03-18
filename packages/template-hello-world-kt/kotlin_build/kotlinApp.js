(function (_, Kotlin, $module$_nativescript_core_application, $module$tns_core_modules_data_observable) {
  'use strict';
  var Any = Object;
  var Unit = Kotlin.kotlin.Unit;
  var Observable = $module$tns_core_modules_data_observable.Observable;
  var app;
  function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
  }
  function createViewModel$lambda$lambda(this$) {
    return function () {
      var currentCounterValue = this$.get('counter');
      var newCounterValue = currentCounterValue - 1 | 0;
      this$.set('counter', newCounterValue);
      this$.set('message', getMessage(newCounterValue));
      return Unit;
    };
  }
  function createViewModel() {
    var $receiver = new Observable();
    var initialCounterValue = 42;
    $receiver.set('counter', initialCounterValue);
    $receiver.set('message', getMessage(initialCounterValue));
    $receiver.set('onTap', createViewModel$lambda$lambda($receiver));
    return $receiver;
  }
  function getMessage(counter) {
    return counter <= 0 ? 'Hoorraaay! You unlocked the NativeScript clicker achievement!' : counter.toString() + ' taps left';
  }
  Object.defineProperty(_, 'app', {
    get: function () {
      return app;
    }
  });
  _.onNavigatingTo = onNavigatingTo;
  _.createViewModel = createViewModel;
  var appModule = new Any();
  appModule.moduleName = 'app-root';
  $module$_nativescript_core_application.run(appModule);
  app = Unit;
  Kotlin.defineModule('kotlinApp', _);
  return _;
}(module.exports, require('kotlin'), require('@nativescript/core/application'), require('tns-core-modules/data/observable')));

//# sourceMappingURL=kotlinApp.js.map
