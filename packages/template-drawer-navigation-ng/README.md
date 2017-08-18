# NativeScript with Angular Drawer Navigation Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

App template featuring a Side Drawer component for navigation.

<img src="/tools/assets/phone-drawer-ios.png" height="400" /> <img src="/tools/assets/phone-drawer-android.png" height="400" />

## Key Features
- Side drawer navigation
- Five blank pages hooked to the drawer navigation
- Customizable theme
- UX and development best practices
- Easy to understand code through extensive code comments

## Quick Start
Execute the following command to create an app from this template:

```
tns create my-app-name --template tns-template-drawer-navigation-ng
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm] (https://www.npmjs.com/package/tns-template-drawer-navigation-ng).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
tns create my-app-name --template https://github.com/NativeScript/template-drawer-navigation-ng
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture
There are five blank components located in these folders:
- `/browse`
- `/featured`
- `/home`
- `/search`
- `/settings`

Each of these pages has the following components:
- `ActionBar` - holds the title and navigation button that opens the drawer.
- `RadSideDrawer` - component to display a drawer on the page.
- `tkDrawerContent` - part of the RadSideDrawer, it holds a custom component `MyDrawer` that displays the contents of the drawer.
- `tkMainContent` - part of the RadSideDrawer, it holds the main content for the page. You can expand this layout to modify each page.

There is a NativeScript custom component that holds the contents of the drawer.
- `/shared/my-drawer` - holds the contents of the drawer that are reused on every page. There is a StackLayout for the profile info on top and a ListView for showing the navigation items. Expand this custom component to match what you want to have in your drawer.

### Styling
This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:
- `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles.
- `app.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `platform.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `platform.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

Each component including the drawer custom component has 3 style files located in the folder of the component:
- `_component-name.component.scss` - the component common style sheet. These style rules are applied to both Android and iOS.
- `component-name.component.android.scss` - the component Android style sheet. These style rules are applied to Android only.
- `component-name.component.ios.scss` - the component iOS style sheet. These style rules are applied to iOS only.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the   [Issues](https://github.com/NativeScript/template-drawer-navigation-ng/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
