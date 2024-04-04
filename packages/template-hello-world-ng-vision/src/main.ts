import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from './app/app.module';

runNativeScriptAngularApp({
  embedded: true,
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

