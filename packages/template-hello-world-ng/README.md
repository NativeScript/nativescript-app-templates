# NativeScript Angular Template

This template creates a "Hello, world" NativeScript app using TypeScript and Angular.

You can create a new app that uses this template with either the `--template` option.

```
tns create my-hello-world-ng --template tns-template-hello-world-ng
```

Or the `--ng` shorthand.

```
tns create my-hello-world-ng --ng
```

> Note: Both commands will create a new NativeScript app that uses the latest version of this template published to [npm] (https://www.npmjs.com/package/tns-template-hello-world-ng).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
# clone nativescript-app-templates monorepo locally
git clone git@github.com:NativeScript/nativescript-app-templates.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
tns create my-hello-world-ng --template nativescript-app-templates/packages/template-hello-world-ng
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

# Issues

Issues related to `template-hello-world-ng` template should be logged in the https://github.com/NativeScript/NativeScript repository.
