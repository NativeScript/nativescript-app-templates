
NOTE: This guide assumes that you have a working version of the Enterprise Login NativeScript app set up locally.

### Modify the app to use your Kinvey project

 - In Kinvey go to your app dashboard (you can find your app key and secret in the dropdown menu in the environment sidebar), copy both the **App Key** and **App Secret** then replace them in `app/shared/config.js`. For example if your App Key is **kid_Sy8CV9v7W** with App Secret **94d5019e0f45412b9dc419f94e019ca0**, the updated config.js will look like:
```javascript
module.exports = {
    kinveyAppKey: "kid_Sy8CV9v7W",
    kinveyAppSecret: "94d5019e0f45412b9dc419f94e019ca0"
};
```