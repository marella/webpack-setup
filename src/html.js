const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (config, settings, src, options = {}) => {
  options = Object.assign({
    template: src,
    inject: true,
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
  }, options)

  config.plugins.push(
    new HtmlWebpackPlugin(options)
  )
}
