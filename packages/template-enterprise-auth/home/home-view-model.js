const observableModule = require("tns-core-modules/data/observable");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const topmost = require("tns-core-modules/ui/frame").topmost;


function HomeViewModel(userInfo) {
    const viewModel = observableModule.fromObject({
        loggedUser: userInfo,

        logout: function () {
            Kinvey.User.logout()
                .then(() => {
                    topmost().navigate({
                        moduleName: "login/login-page",
                        animated: true,
                        transition: {
                            name: "slideTop",
                            duration: 350,
                            curve: "ease"
                        }
                    });
                });
        }
    });

    return viewModel;
}

module.exports = HomeViewModel;
