const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = (config, settings, options = {}) => {
  options = Object.assign({
    alwaysNotify: true,
  }, options)

  config.plugins.push(
    new WebpackNotifierPlugin(options)
  )
}
