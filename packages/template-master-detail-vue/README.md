# NativeScript with Vue Master Detail Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

This Master-Detail template is a fundamental building block for any app that displays collection of objects and their details and need to work both in online and offline mode while utilizing Firebase as a backend. The template uses a RadListView component to display the master list. The RadListView component is part of [Progress NativeScript UI](https://github.com/telerik/nativescript-ui-feedback).

<img src="/tools/assets/phone-masterDetail-ios.png" height="400" /><img src="/tools/assets/phone-masterDetail-detail-ios.png" height="400" />

## Key Features
- Editable master-detail interface
- Integration with Firebase database
- Works offline
- Customizable theme
- UX and development best practices
- Easy to understand code

## Usage

``` bash
# Install dependencies
npm install

# Build
tns build <platform> --bundle

# Build, watch for changes and run the application
tns run <platform> --bundle

# Build, watch for changes and run the application with
# HMR enabled (Hot Module Replacement)
# ---
# make sure you have the latest nativescript cli installed for this to work
# npm install -g nativescript@next
tns run <platform> --hmr

# Clean the NativeScript application instance
tns platform remove <platform>
```

### Debugging vs Production

During usual run, project runs with following settings -

1. Code is **not** minified
2. Vue.config.silent is false, so every component creation is logged

```bash
# Build, watch for changes and debug the application
tns debug <platform> --bundle
```

To minify code, and prevent Vue logs -

```bash
# Build for production
tns build <platform> --bundle --env.production

# Run as production
tns run <platform> --bundle --env.production
```

## Using NativeScript plugins

Installing plugins is the same as official NativeScript [documentation](https://docs.nativescript.org/plugins/plugins#installing-plugins).

Use `tns plugin add` from the root of the project directory.

```shell
tns plugin add <plugin-name>
```
For detailed instructions, see https://github.com/nativescript-vue/vue-cli-template
