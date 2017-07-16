const webpack = require('webpack')

module.exports = (config, settings) => {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}
