const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { resolve } = require('./helpers')

module.exports = (config, settings) => {
  config.devtool = settings.sourcemaps

  config.entry = {}
  config.entry[settings.main] = []
  if (settings.polyfill) {
    let polyfill = settings.polyfill === true ? 'babel-polyfill' : settings.polyfill
    config.entry[settings.main].push(polyfill)
  }

  config.externals = {}

  config.output = {
    path: resolve(settings.output),
    publicPath: settings.base,
  }

  config.module = {
    rules: [],
  }

  config.plugins = [
    new FriendlyErrorsWebpackPlugin(),
  ]

  config.resolve = {
    modules: ['node_modules'].concat(settings.modules),
  }

  config.stats = {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false
  }
}
