import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component} from 'angular2/core';


@Component({
	selector: 'main',
	template: `
<StackLayout orientation='vertical'>
    <Label [text]='message' class='title' (tap)='message = "OHAI"'></Label>
</StackLayout>
`,
})
export class MainPage {
    public message: string = "Hello, Angular!";
}