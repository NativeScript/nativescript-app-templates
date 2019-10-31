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

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
