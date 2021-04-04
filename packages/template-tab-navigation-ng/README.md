# NativeScript with Angular Tab Navigation Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

App template featuring a TabView component for navigation.

<img src="/packages/template-tab-navigation-ng/tools/assets/phone-tab-ios.png" height="400" /> <img src="/packages/template-tab-navigation-ng/tools/assets/phone-tab-android.png" height="400" />

## Key Features
- Tab navigation
- Five blank pages hooked to the tab navigation
- Customizable theme
- UX and development best practices
- Easy to understand code

## Quick Start
Execute the following command to create an app from this template:

```
ns create my-tab-ng --template @nativescript/template-tab-navigation-ng
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/@nativescript/template-tab-navigation-ng).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
# clone nativescript-app-templates monorepo locally
git clone git@github.com:NativeScript/nativescript-app-templates.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
ns create my-tab-ng --template nativescript-app-templates/packages/template-tab-navigation-ng
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture
The tab navigation is set up in the application component:
- `/src/app/app.component` - sets up the tab navigation and defines page router outlets for its items.

There are four components used for the tab content items located in these folders:

- `/src/app/home/home.component` - the master home page. Displays a list of items and navigates to the item details page on item tap.
- `/src/app/home/item-detail/item-detail.component` - the item details page. Displays the details of the tapped item.
- `/src/app/browse/browse.component` - blank page
- `/src/app/search/search.component` - blank page

### Styling
This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://github.com/NativeScript/theme) to understand how to customize it.

It has 3 global style files that are located at the root of the app folder:

- `/src/_app-common.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `/src/app.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `/src/app.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Discord](https://nativescript.org/discord). The Discord channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
