module.exports = (config, settings, options = {}) => {
  options = Object.assign({
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 3000,
    publicPath: settings.base,
    quiet: true,
  }, options)

  config.devServer = options
}
