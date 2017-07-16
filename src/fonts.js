module.exports = (config, settings, dst, options = {}) => {
  options = Object.assign({
    name  : dst + '/' + (settings.versioning ? '[name].[hash:8].[ext]' : '[name].[ext]'),
    limit : 10000,
  }, options)

  const fonts = [
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml'],
  ]
  fonts.forEach(font => {
    const extension = font[0]
    const mimetype = font[1]
    options.mimetype = mimetype

    config.module.rules.push({
      test    : new RegExp(`\\.${extension}$`),
      loader  : 'url-loader',
      options : options,
    })
  })
}
