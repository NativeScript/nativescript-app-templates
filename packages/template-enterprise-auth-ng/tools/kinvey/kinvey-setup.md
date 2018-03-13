
NOTE: This guide assumes that you have a working version of the Enterprise Auth NativeScript app set up locally.

### Modify the app to use your Kinvey project

 - In Kinvey go to your app dashboard (you can find your app key and secret in the dropdown menu in the environment sidebar), copy both the **App Key** and **App Secret** then replace them in `app/package.json`. For example if your App Key is **kid_Sy8CV9v7W** with App Secret **94d5019e0f45412b9dc419f94e019ca0**, the updated pluginsData in package.json will look like:
```JSON
"pluginsData": {
    "kinvey-nativescript-sdk": {
        "config": {
            "appKey": "kid_Sy8CV9v7W",
            "appSecret": "94d5019e0f45412b9dc419f94e019ca0"
        }
    }
}
```