# NativeScript TypeScript Template

This template creates a NativeScript app with the NativeScript hello world example,
however, in this template the example is built with TypeScript.

You can create a new app that uses this template with either the `--template` option.

```
tns create my-hello-world-ts --template tns-template-hello-world-ts
```

Or the `--tsc` shorthand.

```
tns create my-hello-world-ts --tsc
```

> Note: Both commands will create a new NativeScript app that uses the latest version of this template published to [npm] (https://www.npmjs.com/package/tns-template-hello-world-ts).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
# clone nativescript-app-templates monorepo locally
git clone git@github.com:NativeScript/nativescript-app-templates.git

# create app template from local source (all templates are in the 'packages' subfolder of the monorepo)
tns create my-hello-world-ts --template nativescript-app-templates/packages/template-hello-world-ts
```
# Issues

Issues related to `template-hello-world-ts` template should be logged in the https://github.com/NativeScript/NativeScript repository.
