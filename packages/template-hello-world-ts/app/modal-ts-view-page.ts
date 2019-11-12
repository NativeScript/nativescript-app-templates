import { Page, View } from "tns-core-modules/ui/page/page";
import { fromObject } from "tns-core-modules/data/observable/observable";

let closeCallback;

export function onShownModally(args) {
    const context = args.context;
    closeCallback = args.closeCallback;
    const page: Page = <Page>args.object;
    page.bindingContext = fromObject(context);

    const view = <View>page;
    view.cssClasses.forEach(console.log);
    console.log(view.cssClasses.size);
}

export function onLoginButtonTap(args) {
    const page: Page = <Page>args.object.page;
    const bindingContext = page.bindingContext;
    const username = bindingContext.get("username");
    const password = bindingContext.get("password");
    closeCallback(username, password);
}
