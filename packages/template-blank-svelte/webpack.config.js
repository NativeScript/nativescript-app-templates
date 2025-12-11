const webpack = require('@nativescript/webpack')

module.exports = (env) => {
  webpack.init(env)

  // Learn how to customize:
  // https://docs.nativescript.org/webpack
  webpack.mergeWebpack({
    resolve: {
      conditionNames: ['svelte', 'require', 'node'],
      alias: {
        tslib: require.resolve('tslib/tslib.es6.mjs'),
      },
    },
  })

  return webpack.resolveConfig()
}
