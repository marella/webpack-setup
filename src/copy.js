const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (config, settings, patterns, options = {}) => {
  config.plugins.push(new CopyWebpackPlugin(patterns, options))
}
