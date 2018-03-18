const LoginViewModel = require("./login-view-model");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
* Call any view model data initialization load here.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    page.actionBarHidden = true;
    page.backgroundSpanUnderStatusBar = true;
    page.className = "page-login-container";
    page.statusBarStyle = "dark";
    page.bindingContext = new LoginViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
