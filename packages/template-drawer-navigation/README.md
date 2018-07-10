# NativeScript Core Drawer Navigation Template

App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

App template featuring a RadSideDrawer component for navigation. The RadSideDrawer component is part of [Progress NativeScript UI](https://github.com/telerik/nativescript-ui-feedback).

<img src="/tools/assets/phone-drawer-ios.png" height="400" /> <img src="/tools/assets/phone-drawer-android.png" height="400" />

## Key Features

- Side drawer navigation
- Five blank pages hooked to the drawer navigation
- Customizable theme
- UX and development best practices
- Easy to understand code

## Quick Start

Execute the following command to create an app from this template:

``` shell
tns create my-drawer-js --template tns-template-drawer-navigation
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/tns-template-drawer-navigation-ng).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

``` shell
tns create my-drawer-js --template https://github.com/NativeScript/template-drawer-navigation
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture

There is a folder that is used for setting RadSideDrawer instance as an application starting point:

- `/app-root/app-root.js` - sets up the RadSideDrawer drawer content and defines navigation frame for the pages.

RadSideDrawer has the following component structure:

- `RadSideDrawer` - The component to display a drawer on the page.
- `RadSideDrawer.drawerContent` - Part of the RadSideDrawer, it holds a custom component `drawer` that displays the contents of the drawer.
- `RadSideDrawer.mainContent` - Part of the RadSideDrawer, it holds the main content for the page.

The template has the following blank pages:

- `/home/home-page.js`
- `/browse/browse-page.js`
- `/search/search-page.js`
- `/featured/featured-page.js`
- `/settings/settings-page.js`

### Styling

This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:

- `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles.
- `_app-common.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `app.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `app.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

## Get Help

The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
