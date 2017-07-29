const WebpackNotifierPlugin = require('webpack-notifier')
const { resolve } = require('path')

module.exports = (config, settings, options = {}) => {
  options = Object.assign(
    {
      alwaysNotify: true,
      contentImage: resolve(__dirname, '../assets/react.ico'),
    },
    options
  )

  config.plugins.push(new WebpackNotifierPlugin(options))
}
