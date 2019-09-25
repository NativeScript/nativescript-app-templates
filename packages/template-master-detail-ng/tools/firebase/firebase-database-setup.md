
NOTE: This guide assumes that you have a working version of the master / detail NativeScript app set up locally.

### Add Firebase to your app

 - Follow the [Firebase documentation](https://firebase.google.com/docs/android/setup#manually_add_firebase) to add Firebase to your app (you will need a Firebase project and a Firebase configuration file for your iOS / Android app).
 - When prompted for your app's package name make sure it matches the appid generated for your NativeScript app (open the root `package.json` for your app in your favorite editor and find the "nativescript" node there -- the "id" child node is your appid)
 - Download the generated Firebase configuration files and replace the existing `app/App_Resources/iOS/GoogleService-Info.plist` and `app/App_Resources/Android/google-services.json` in your app (for iOS and Android respectively)
 - In Firebase go to project settings (the settings button is to the right of the **Overview** side menu item), copy the **Project ID** and replace the one in `app/shared/config.ts` with it. For example if your Project ID is **my-awesome-project-80fbb**, the updated config.ts will look like:
```typescript
export class Config {
    static firebaseBucket = "gs://my-awesome-project-80fbb.appspot.com/";
}
```

### Set up your Firebase sample data
 - Follow the [Firebase documentation](https://support.google.com/firebase/answer/6386780?hl=en#import) to import the [sample JSON data](https://github.com/NativeScript/nativescript-app-templates/blob/master/packages/template-master-detail-ng/tools/firebase/car-rental-export-public.json) to your Firebase project
 - Default database security rules in Firebase require users to be authenticated but [for simplicity] the current version of the NativeScript master / detail app does not provide built-in support for authentication / authorization. Follow the [Firebase documentation](https://firebase.google.com/docs/database/security/quickstart) to replace the default rules (DO NOT use this ruleset for a production app):
```json
{
  "rules": {
    "cars": {
      ".read": true,
      ".write": true
    }
  }
}
```
 - Default storage security rules in Firebase require users to be authenticated in order to upload new content (the master / detail "edit" functionality supports uploading new images to Firebase). Follow the [Firebase documentation](https://firebase.google.com/docs/storage/security/start) to replace the default storage security rules as [for simplicity] the master / detail app does not implement authentication / authorization in the current version (DO NOT use this ruleset for a production app):
```
service firebase.storage {
  match /b/{bucket}/o {
    match /cars/{allPaths=**} {
      allow read,write;
    }
  }
}
```
- You need to comment out the readonly section in this car detail edit component and uncomment the actual code: https://github.com/NativeScript/nativescript-app-templates/blob/master/packages/template-master-detail-ng/src/app/cars/car-detail-edit/car-detail-edit.component.ts
 
