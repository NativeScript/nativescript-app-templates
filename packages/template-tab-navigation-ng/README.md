# NativeScript with Angular Tab Navigation Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

App template featuring a TabView component for navigation.

<img src="/tools/assets/phone-tab-ios.png" height="400" /> <img src="/tools/assets/phone-tab-android.png" height="400" />

## Key Features
- Tab navigation
- Five blank pages hooked to the tab navigation
- Customizable theme
- UX and development best practices
- Easy to understand code through extensive code comments

## Quick Start
Execute the following command to create an app from this template:

```
tns create my-app-name --template https://github.com/NativeScript/template-tab-navigation-ng
```

## Walkthrough

### Architecture
There is one main component that holds the tabs page:
- `/tabs/tabs.component.ts` - sets up the tab navigation page layout and references the navigatable views contents via custom components.

There are five blank custom components used for the tab views located in these folders:
- `/tabs/browse`
- `/tabs/featured`
- `/tabs/home`
- `/tabs/search`
- `/tabs/settings`

### Styling
This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:
- `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles.
- `app.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `platform.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `platform.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

Each component has 3 style files located in the its folder:
- `_component-name.component.scss` - the component common style sheet. These style rules are applied to both Android and iOS.
- `component-name.component.android.scss` - the component Android style sheet. These style rules are applied to Android only.
- `component-name.component.ios.scss` - the component iOS style sheet. These style rules are applied to iOS only.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the   [Issues](https://github.com/NativeScript/template-tab-navigation-ng/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
