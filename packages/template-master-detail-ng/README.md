# NativeScript with Angular Master Detail Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

This Master-Detail template is a fundamental building block for any app that displays collection of objects and their details and need to work both in online and offline mode while utilizing Firebase as a backend. The template uses a RadListView component to display the master list. The RadListView component is part of [Progress NativeScript UI](https://github.com/telerik/nativescript-ui-feedback).

<img src="/packages/template-master-detail-ng/tools/assets/phone-masterDetail-ios.png" height="400" /><img src="/packages/template-master-detail-ng/tools/assets/phone-masterDetail-detail-ios.png" height="400" />

## Key Features
- Editable master-detail interface
- Integration with Firebase database
- Works offline
- Customizable theme
- UX and development best practices
- Easy to understand code

## Quick Start
Execute the following command to create an app from this template:

```
ns create my-master-detail-ng --template @nativescript/template-master-detail-ng
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/@nativescript/template-master-detail-ng).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
# clone nativescript-app-templates monorepo locally
git clone git@github.com:NativeScript/nativescript-app-templates.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
ns create my-master-detail-ng --template nativescript-app-templates/packages/template-master-detail-ng
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture
The application component:
- `/src/app/app.component` - sets up a page router outlet that lets you navigate between pages.

The template has the following components:
- `/src/app/cars/car-list.component` - the master list component. It gets the data and displays it in a list. On item tap, it navigates to the item details component.
- `/src/app/cars/car-detail/car-detail.component` - the item details component. Displays the details of the tapped item. Has an `Edit` button that leads to the edit component.
- `/src/app/cars/car-detail-edit/car-detail-edit.component` - the item details edit component. Provides edit options for the selected item. The `Done` button saves the changes.

There is one model to represent the data items:
- `/src/app/cars/shared/car.model`

The template also provides a data service:
- `/src/app/cars/shared/car.service` - serves as a data layer for the master-detail data items. Wraps the functions that are used to make operations on the database.

### Firebase integration
The templates uses the [{N} Firebase plugin](https://github.com/EddyVerbruggen/nativescript-plugin-firebase). The initialization is done before the app starts in the `/src/main.ts` file. The initialization script is located at `/src/app/shared/firebase.common.ts`.

### [Optional] Firebase database setup
By design the app is connected to a read-only copy of the sample data in Firebase. If you want to see the "edit" functionality in action you will have to clone the sample data and update the app configuration to point to your own Firebase setup. You can find detailed instructions how to achieve that [here](https://github.com/NativeScript/nativescript-app-templates/blob/master/packages/template-master-detail-ng/tools/firebase/firebase-database-setup.md).

### Styling
This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://github.com/NativeScript/theme) to understand how to customize it.

It has 3 global style files that are located at the root of the app folder:

- `/src/_app-common.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `/src/app.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `/src/app.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

Each component has 3 style files located in its folder:

- `../_{page-name}.component.scss` - the component common style sheet. These style rules are applied to both Android and iOS.
- `../{page-name}.component.android.scss` - the component Android style sheet. These style rules are applied to Android only.
- `../{page-name}.component.ios.scss` - the component iOS style sheet. These style rules are applied to iOS only.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Discord](https://nativescript.org/discord). The Discord channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
