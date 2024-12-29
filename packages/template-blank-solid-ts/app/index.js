import { Application } from '@nativescript/core';
import { render } from '@nativescript-community/solid-js'
import { App } from './app'

Application.run({
  create: () => {
    document.body.actionBarHidden = true;
    render(() => <App />, document.body)
    return document;
  },
})
