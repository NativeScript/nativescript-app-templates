# React NativeScript Blank Template

App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

## Quick Start from NPM package
Execute the following command to create an app from this template:

```
ns create my-blank-react --react

cd my-blank-react
npm install

ns preview
# or
ns run android
# or
ns run ios
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/tns-template-blank-react).

<!--
## Quick start from the latest master

```sh
ns create my-blank-react --template https://github.com/shirakaba/tns-template-blank-react/tarball/master
```

## Building from a local clone of the repo

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
# clone nativescript-app-templates monorepo locally
git clone https://github.com/shirakaba/tns-template-blank-react.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
ns create my-blank-react --template tns-template-blank-react

cd my-blank-react
npm install

ns preview
# or
ns run android
# or
ns run ios
```
-->

**NB:** Please, keep in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture
There is a single blank component located in:
- `/components/AppContainer.tsx` - sets up an empty page layout.

**Home** page has the following components:
- `<actionBar>` - It holds the title of the page.
- `<gridLayout>` - The main page layout that should contains all the page content.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Discord](https://nativescript.org/discord). The Discord `#react` channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in this repository's [Issues page](https://github.com/shirakaba/tns-template-blank-react/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
