# NOTE: This template is currently a work in progress. We do not recommend using it for a production app just yet.

# Known Issues:
- To use this template with iOS Simulator you need to manually enable `Keychain Sharing` in the target settings’ Capabilities tab in XCode

# NativeScript with Angular Master Detail Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

This Master-Detail template is a fundamental building block for any app that displays collection of objects and their details and need to work both in online and offline mode while utilizing Kinvey as a backend.

<img src="/tools/assets/phone-masterDetail-ios.png" height="400" /><img src="/tools/assets/phone-masterDetail-detail-ios.png" height="400" />

## Key Features
- Editable master-detail interface
- Integration with Kinvey database
- Works offline
- Customizable theme
- UX and development best practices
- Easy to understand code through extensive code comments

## Quick Start
Execute the following command to create an app from this template:

```
tns create my-app-name --template https://github.com/NativeScript/template-master-detail-kinvey-ng
```

## Walkthrough

### Architecture
The template has the following components:
- `/cars/car-list.component.ts` - the master list component. It gets the data and displays it in a list. On item tap, it navigates to the item details component.
- `/cars/car-detail/car-detail.component.ts` - the item details component. Displays the details of the tapped item. Has an `Edit` button that leads to the edit component.
- `/cars/car-detail-edit/car-detail-edit.component.ts` - the item details edit component. Provides edit options for the selected item. The `Done` button saves the changes.

There is one model to represent the data items:
- `/cars/shared/car.model.ts`

The template also provides a data service:
- `/cars/shared/car.service.ts` - serves as a data layer for the master-detail data items. Wraps the functions that are used to make operations on the Kinvey database.

### Kinvey integration
The templates uses the [{N} Kinvey plugin](https://github.com/Kinvey/nativescript-sdk). The initialization is done before the app starts in the `/main.ts` file. The initialization script is located at `/shared/kinvey.common.ts`.

### [Optional] Kinvey database setup
By design the app is connected to a read-only copy of the sample data in Kinvey. If you want to see the "edit" functionality in action you will have to clone the sample data and update the app configuration to point to your own Kinvey setup. You can find detailed instructions how to achieve that [here](https://github.com/NativeScript/template-master-detail-kinvey-ng/blob/master/tools/kinvey/kinvey-database-setup.md).

### Styling
This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:
- `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles.
- `app.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `platform.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `platform.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

Each component has 3 style files located in its folder:
- `_page-name.scss` - the component common style sheet. These style rules are applied to both Android and iOS.
- `page-name.android.scss` - the component Android style sheet. These style rules are applied to Android only.
- `page-name.ios.scss` - the component iOS style sheet. These style rules are applied to iOS only.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the   [Issues](https://github.com/NativeScript/template-master-detail-kinvey-ng/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!
