# template-enterprise-auth
NativeScript template for creating mobile apps that use enterprise identity and single sign-on systems to authenticate users. The template leverages [Kinvey's Mobile Identity Connect](https://devcenter.kinvey.com/nativescript/guides/mobile-identity-connect) feature to support various identity providers including SAML, OAuth2, OpenID Connect, Active Directory and more.

# NativeScript Core Enterprise Auth Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

This Enterprise Auth template is a bootstrap for a NativeScript app that can log users into a variety of enterprise authentication systems using Kinvey's Mobile Identity Connect feature.

![demo](https://github.com/NativeScript/nativescript-app-template/blob/master/packages/template-enterprise-auth/tools/assets/enterprise-auth-preview.gif?raw=true)

## Key Features
- Login/logout interface out-of-the-box
- Integration with Kinvey MIC
- UX and development best practices
- Easy to understand code through extensive code comments

## Quick Start
Execute the following command to create an app from this template:

```
tns create my-app-name --template tns-template-enterprise-auth
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm] (https://www.npmjs.com/package/tns-template-enterprise-auth).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
tns create my-app-name --template https://github.com/NativeScript/template-enterprise-auth
```

## Walkthrough

### Architecture
The template has the following components:
- `app/home/home-page.js` - The home page of the app - provides a Login button which, when clicked, takes the user through the configured login process.

### Kinvey integration
The template uses the [{N} Kinvey plugin](https://github.com/Kinvey/nativescript-sdk). The initialization is done before the app starts in the `app/app.js` file. The initialization script is located at `app/shared/kinvey.common.js`. Once an application is created using the template, the configuration of Kinvey key and secret need to be done in `app/package.json`.

### [Optional] Kinvey database setup
By design the app is not associated with any Kinvey account. To make the login work you will need to have one with Kinvey Mobile Identity Connect Auth Service set up. You can find detailed instructions how to achieve that [here](https://devcenter.kinvey.com/nativescript/guides/mobile-identity-connect).

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the   [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
