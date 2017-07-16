const webpack = require('webpack')

module.exports = (config, settings, globals = {}) => {
  config.plugins.push(
    new webpack.DefinePlugin(globals)
  )
}
