# NativeScript with Angular Tab Navigation Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

App template featuring a TabView component for navigation.

<img src="/tools/assets/phone-tab-ios.png" height="400" /> <img src="/tools/assets/phone-tab-android.png" height="400" />

## Key Features
- Tab navigation
- Five blank pages hooked to the tab navigation
- Customizable theme
- UX and development best practices
- Easy to understand code

## Quick Start
Execute the following command to create an app from this template:

```
tns create my-tab-ng --template tns-template-tab-navigation-ng
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm] (https://www.npmjs.com/package/tns-template-tab-navigation-ng).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
tns create my-tab-ng --template https://github.com/NativeScript/template-tab-navigation-ng
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture
The TabView component is set up as an application starting point in:
- `app.component.ts` - sets up the tab view and defines page router otlets for its items.

There are four components used for the tab views located in these folders:

- `/browse`
- `/home`
- `/item-detail`
- `/search`

### Styling
This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:
- `_app-common.scss` - holds the CSS rules you want to apply on both iOS and Android here.
- `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles.
- `app.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `app.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

A component could have 3 style files located in the its folder:
- `_component-name.component.scss` - the component common style sheet. These style rules are applied to both Android and iOS.
- `component-name.component.android.scss` - the component Android style sheet. These style rules are applied to Android only.
- `component-name.component.ios.scss` - the component iOS style sheet. These style rules are applied to iOS only.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
