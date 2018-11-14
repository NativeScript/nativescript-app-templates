const observableModule = require("tns-core-modules/data/observable");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const topmost = require("tns-core-modules/ui/frame").topmost;

function LoginViewModel() {
    const viewModel = observableModule.fromObject({

        login: function () {
            var that = this;
            var activeUser = Kinvey.User.getActiveUser();
            if (activeUser == null) {
                Kinvey.User.loginWithMIC()
                    .then(function (user) {
                        activeUser = user;
                        that._navigateHome(activeUser);
                        console.log("user: " + JSON.stringify(user));
                    })
                    .catch(function (error) {
                        alert("An error occurred. Check your Kinvey settings.");
                        console.log("error: " + error);
                    });
            }
            else {
                this._navigateHome(activeUser);
            }
        },

        _navigateHome: function (user) {
            topmost().navigate({
                moduleName: "home/home-page",
                context: user.data['_socialIdentity'].kinveyAuth.id,
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 350,
                    curve: "ease"
                }
            });
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;
