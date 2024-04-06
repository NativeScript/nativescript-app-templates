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

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/@nativescript/template-blank-react).


**NB:** Please, keep in mind that the main branch may refer to dependencies that are not on NPM yet!

## Walkthrough

Having created an app from this template, here's an introduction to how it works:

### Architecture

- `src/app.ts`: The app entrypoint. It renders the MainStack component as the root component.
- `src/components/MainStack.tsx`: A React Navigation 5 [stack navigator](https://reactnavigation.org/docs/5.x/stack-navigator/) serving as the root component.
- `src/components/ScreenOne.tsx`, `src/components/ScreenTwo.tsx`: A couple of screens to navigate to.
- `src/NavigationParamList.tsx`: A record of the navigation params for each route in your app.

### The basics

Learn React NativeScript itself by reading [its docs](https://react-nativescript.netlify.app/docs/introduction/introduction.html).

Learn how to navigate by referring to the React Navigation 5 [docs])https://reactnavigation.org/docs/5.x/getting-started) and refer to the [react-nativescript-navigation](https://github.com/shirakaba/react-nativescript-navigation/tree/master/react-nativescript-navigation) repo to see which options are supported for each navigator.

React libraries without a dependency on `react-dom` (like Redux) should work just fine in React NativeScript as long as the `react` version is compatible.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Discord](https://nativescript.org/discord). The Discord `#react` channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in this repository's [Issues page](https://github.com/shirakaba/tns-template-blank-react/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
