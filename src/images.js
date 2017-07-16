module.exports = (config, settings, dst, options = {}) => {
  options = Object.assign({
    name: dst + '/' + (settings.versioning ? '[name].[hash:8].[ext]' : '[name].[ext]'),
    limit: 8192,
  }, options)

  config.module.rules.push({
    test: /\.(bmp|gif|jpe?g|png|svg)$/,
    loader: 'url-loader',
    options: options,
  })
}
