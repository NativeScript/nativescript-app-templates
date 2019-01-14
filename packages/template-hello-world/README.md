# NativeScript JavaScript Template

This template creates a "Hello, world" NativeScript app using JavaScript.

This is the default template, so you can create a new app that uses it with the `--template` option:

```
tns create my-hello-world-js --template tns-template-hello-world
```

Or without it:

```
tns create my-hello-world-js
```

> Note: Both commands will create a new NativeScript app that uses the latest version of this template published to [npm] (https://www.npmjs.com/package/tns-template-hello-world).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
# clone nativescript-app-templates monorepo locally
git clone git@github.com:NativeScript/nativescript-app-templates.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
tns create my-hello-world-js --template nativescript-app-templates/packages/template-hello-world
```
# Issues

Issues related to `template-hello-world` template should be logged in the https://github.com/NativeScript/NativeScript repository.
