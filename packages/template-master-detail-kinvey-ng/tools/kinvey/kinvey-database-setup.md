
NOTE: This guide assumes that you have a working version of the master / detail NativeScript app set up locally.

### Modify the app to use your Kinvey project

 - In Kinvey go to your app dashboard (you can find your app key and secret in the dropdown menu in the environment sidebar), copy both the **App Key** and **App Secret** then replace them in `app/shared/config.ts`. For example if your App Key is **kid_Sy8CV9v7W** with App Secret **94d5019e0f45412b9dc419f94e019ca0**, the updated config.ts will look like:
```typescript
export class Config {
    static kinveyAppKey = "kid_Sy8CV9v7W";
    static kinveyAppSecret = "94d5019e0f45412b9dc419f94e019ca0";
    static kinveyUsername = "[kinvey-username]"; /* see section below */
    static kinveyPassword = "[kinvey-password]"; /* see section below */
}
```

### Set up an app user
 - Communication between the mobile app and Kinvey database requires authenticated access. For simplicity the app itself does not provide support for authentication / authorization so you will need to create a "system" user for testing purposes. In Kinvey navigate to the Users section in the environment sidebar to create new user.
 - Copy both the **Username** and **Password** for the newly created user and then replace them in `app/shared/config.ts`. For example if your Username is **admin** with Password **admin**, the updated config.ts will look like:
```typescript
export class Config {
    static kinveyAppKey = "kid_Sy8CV9v7W";
    static kinveyAppSecret = "94d5019e0f45412b9dc419f94e019ca0";
    static kinveyUsername = "admin";
    static kinveyPassword = "admin";
}
```

### Set up your Kinvey sample data
 - In Kinvey create **'cars'** data collection, from the environment sidebar of your app, and import the [sample JSON data](https://github.com/NativeScript/template-master-detail-kinvey-ng/blob/master/tools/kinvey/car-rental-export-public.json) to it.
 - Navigate to **'cars'** collection settings page and set **permissions** to **Public**, in order to allow your "system" user to both read and modify data.
 - You need to comment out the readonly section in this car detail edit component and uncomment the actual code: https://github.com/NativeScript/template-master-detail-kinvey-ng/blob/master/cars/car-detail-edit/car-detail-edit.component.ts
