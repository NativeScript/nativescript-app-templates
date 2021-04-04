# NativeScript App Templates
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

This monorepo contains the following NativeScript app templates:
- Hello World ([JavaScript](/packages/template-hello-world), [TypeScript](/packages/template-hello-world-ts), and [Angular](/packages/template-hello-world-ng))
- Blank ([JavaScript](/packages/template-blank), [TypeScript](/packages/template-blank-ts), [Angular](/packages/template-blank-ng), [Vue](/packages/template-blank-vue), [React](/packages/template-blank-react), and [Svelte](/packages/template-blank-svelte))
- Drawer Navigation ([JavaScript](/packages/template-drawer-navigation), [TypeScript](/packages/template-drawer-navigation-ts), [Angular](/packages/template-drawer-navigation-ng), and [Vue](/packages/template-drawer-navigation-vue))
- Tab Navigation ([JavaScript](/packages/template-tab-navigation), [TypeScript](/packages/template-tab-navigation-ts), [Angular](/packages/template-tab-navigation-ng), and [Vue](/packages/template-tab-navigation-vue))
- Master Detail with Firebase ([JavaScript](/packages/template-master-detail), [TypeScript](/packages/template-master-detail-ts), [Angular](/packages/template-master-detail-ng), and [Vue](/packages/template-master-detail-vue))
- Master Detail with Kinvey ([JavaScript](/packages/template-master-detail-kinvey), [TypeScript](/packages/template-master-detail-kinvey-ts), and [Angular](/packages/template-master-detail-kinvey-ng))

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Discord](https://nativescript.org/discord). The Discord channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.

## Releasing

This monorepo uses Lerna to manage packages and their releases.

Install the dependencies in the root of the repo with

```bash
$ npm i # or yarn
```

To list which packages have been changed since the last release

```bash
$ npx lerna changed
```

This will print something like this

```bash
lerna notice cli v3.14.2
lerna info versioning independent
lerna info Looking for changed packages since tns-template-blank-ng@6.5.4
lerna info ignoring diff in paths matching [ 'ignored-file', '*.md' ]
tns-template-hello-world-ng
lerna success found 1 package ready to publish
```

To manually specify version for each package interactively run

```bash
$ npx lerna version
```

This should prompt the new version number for every changed package.

To release the packages, run

```bash
$ npx lerna publish
```

If you want to bump and publish at the same time,

```bash
$ npx lerna publish
```

will also prompt the new version interactively and then publish the package to npm.
