# NativeScript Vue Blank Typescript Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

## Quick Start
Execute the following command to create an app from this template:

```
ns create my-blank-vue-ts --template @nativescript/template-blank-vue-ts
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/@nativescript/template-blank-vue-ts).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
# clone nativescript-app-templates monorepo locally
git clone git@github.com:NativeScript/nativescript-app-templates.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
ns create my-blank-vue-ts --template nativescript-app-templates/packages/template-blank-vue-ts
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture
There is a single blank component located in:
- `/app/components/Home.vue` - sets up an empty page layout.

**Home** page has the following components:
- `ActionBar` - It holds the title of the page.
- `GridLayout` - The main page layout that should contains all the page content.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](https://www.nativescript.org/slack-invitation-form). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
