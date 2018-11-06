# Kinvey setup instructions

NOTE: This guide assumes that you have a working version of the Enterprise Auth NativeScript app set up locally.

## Modify the app to use your Kinvey project

- First open your MIC service settings (you can find the page under **Service Catalog** in the Kinvey Console) and scroll down to **Redirect URI's**. Add a new redirect URI with the following format: `name://`. The `name` can contain only letters and should be unique to your app (for example: **mycheme://**). This URI should be set in the `pluginsData` section in the `src/package.json` file.
- Then, in the Kinvey Console go to your app dashboard (you can find your app key and secret in the dropdown menu in the environment sidebar), copy both the **App Key** and **App Secret** then replace them in `src/package.json`. For example if your App Key is **kid_Sy8CV9v7W** with App Secret **94d5019e0f45412b9dc419f94e019ca0**, the updated `pluginsData` in `src/package.json` will look like:

```JSON
"pluginsData": {
    "kinvey-nativescript-sdk": {
        "config": {
            "appKey": "kid_Sy8CV9v7W",
            "appSecret": "94d5019e0f45412b9dc419f94e019ca0",
            "redirectUri": "myscheme://"
        }
    }
}
```