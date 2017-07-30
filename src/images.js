module.exports = (config, settings, dst, options = {}) => {
  options = Object.assign(
    {
      name:
        `${dst}/` +
        (settings.versioning ? '[name].[hash:8].[ext]' : '[name].[ext]'),
    },
    options
  )

  config.module.rules.push({
    test: /\.(bmp|gif|jpeg|jpg|png|svg)$/,
    loader: require.resolve('file-loader'),
    options: options,
  })
}
