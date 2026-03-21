import { render } from "@nativescript-community/solid-js";
import { Application } from "@nativescript/core";
import { document } from "dominative";
import { App } from "./app";

Application.run({
  create: () => {
    render(App, document.body);
    return document;
  },
})
