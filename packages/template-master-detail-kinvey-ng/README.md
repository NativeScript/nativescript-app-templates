# NOTE: This template is currently WIP (work in progress). Do not use it in production!
### Known issues with Kinvey SDK

 - [Android] save() method does not work correctly (it updates the remote store, but fails to update the local cache; as a result next time when the users opens the app, Kinvey detects there is a local / remote data discrepancy and fails to fetch the data -- https://github.com/Kinvey/nativescript-sdk/issues/16)
 - [iOS / Android] image uploads do not work altogether

# NativeScript Angular Template

This template creates a NativeScript Master-Detail app with editing and Kinvey data using TypeScript and Angular.

You can create a new app that uses this template with the `--template` option:

```
tns create my-app-name --template https://github.com/NativeScript/template-master-detail-kinvey-ng.git
```

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
tns create my-app-name --template https://github.com/NativeScript/template-master-detail-kinvey-ng.git#master
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!
