# NativeScript Core Drawer Navigation Template

App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

App template featuring a RadSideDrawer component for navigation. The RadSideDrawer component is part of [Progress NativeScript UI](https://github.com/telerik/nativescript-ui-feedback).

<img src="/packages/template-drawer-navigation/tools/assets/phone-drawer-ios.png" height="400" /> <img src="/packages/template-drawer-navigation/tools/assets/phone-drawer-android.png" height="400" />

## Key Features

- Side drawer navigation
- Five blank pages hooked to the drawer navigation
- Customizable theme
- UX and development best practices
- Easy to understand code

## Quick Start

Execute the following command to create an app from this template:

``` shell
ns create my-drawer-js --template @nativescript/template-drawer-navigation
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/@nativescript/template-drawer-navigation).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

``` shell
# clone nativescript-app-templates monorepo locally
git clone git@github.com:NativeScript/nativescript-app-templates.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
ns create my-drawer-js --template nativescript-app-templates/packages/template-drawer-navigation
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture

There is a folder that is used for setting RadSideDrawer instance as an application root:

- `/app/app-root/app-root` - sets up the RadSideDrawer drawer content and defines navigation frame for the pages.

RadSideDrawer has the following component structure:

- `RadSideDrawer` - The component to display a drawer on the page.
- `RadSideDrawer.drawerContent` - Part of the RadSideDrawer, it holds a custom component `drawer` that displays the contents of the drawer.
- `RadSideDrawer.mainContent` - Part of the RadSideDrawer, it holds the main content for the page.

The template has the following blank page modules:

- `/app/home/home-page`
- `/app/browse/browse-page`
- `/app/search/search-page`
- `/app/featured/featured-page`
- `/app/settings/settings-page`

### Styling

This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://github.com/NativeScript/theme) to understand how to customize it.

It has 3 global style files that are located at the root of the app folder:

- `/app/_app-common.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `/app/app.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `/app/app.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

## Get Help

The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](https://www.nativescript.org/slack-invitation-form). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
