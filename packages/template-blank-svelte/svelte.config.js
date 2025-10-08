const sveltePreprocess = require('svelte-preprocess')
const svelteNativePreprocessor = require('@nativescript-community/svelte-native-preprocessor')

// this can be called either through svelte-loader where we want either __ANDROID__ or __IOS__ to be defined but not both
// or through svelte-check where we want both so everything is checked
const webpack_env = process.env['NATIVESCRIPT_WEBPACK_ENV']
  ? JSON.parse(process.env['NATIVESCRIPT_WEBPACK_ENV'])
  : {
      android: true,
      ios: true,
    }
module.exports = {
  compilerOptions: {
    namespace: 'foreign',
  },
  preprocess: [
    sveltePreprocess({
      replace: [
        [/__ANDROID__/g, !!webpack_env.android],
        [/__IOS__/g, !!webpack_env.ios],
      ],
      typescript: {
        compilerOptions: {
          verbatimModuleSyntax: true,
          target: 'es2020',
        },
      },
    }),
    // if you want bind:text="{email}" to be transformed to text="{email}" on:textChanged="{e => email = e.value}"
    // enable svelteNativePreprocessor. Keep in mind that it is pretty slow
    /* svelteNativePreprocessor() */
  ],
}
