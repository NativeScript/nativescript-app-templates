/**
 * As a convenience we've added several common plugins in case your project ends up using them.
 * Once the listed plugins have been built and distributed with ng-packagr they can be removed from here safely.
 */
module.exports = {
  packages: {
    "nativescript-localize": {
      entryPoints: {
        ".": {
          override: {
            main: "./angular.js",
            typings: "./angular.d.ts",
          },
          ignoreMissingDependencies: true,
        },
      },
      ignorableDeepImportMatchers: [
        /tns-core-modules\//,
        /@nativescript\/core\//,
        /@nativescript\/angular\//,
        /nativescript-angular\//,
      ]
    },
    "nativescript-datetimepicker": {
      entryPoints: {
        ".": {
          override: {
            main: "./index.js",
            typings: "./index.d.ts",
          },
          ignoreMissingDependencies: true,
        },
        "angular": {
          override: {
            main: "./index.js",
            typings: "./index.d.ts",
          },
          ignoreMissingDependencies: true,
        }
      },
      ignorableDeepImportMatchers: [
        /tns-core-modules\//,
        /@nativescript\/core\//,
        /@nativescript\/angular\//,
        /nativescript-angular\//,
      ]
    }
  }
};