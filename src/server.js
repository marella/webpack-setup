module.exports = (config, settings, options = {}) => {
  const { base } = settings
  options = Object.assign(
    {
      compress: true,
      hot: true,
      historyApiFallback: {
        index: base + 'index.html',
      },
      openPage: base.replace(/^\//, ''),
      overlay: true,
      port: 3000,
      publicPath: base,
      quiet: true,
    },
    options
  )

  config.devServer = options
}
