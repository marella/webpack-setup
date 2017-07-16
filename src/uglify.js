const webpack = require('webpack')

module.exports = (config, settings, options = {}) => {
  options = Object.assign({
    sourceMap: !!settings.sourcemaps,
    comments: false,
    compress: {
      warnings: false,
      screw_ie8: true,
    },
  }, options)

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(options)
  )
}
