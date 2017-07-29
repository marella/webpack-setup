const { resolve } = require('./helpers')

module.exports = (config, settings, src, options = {}) => {
  src = [].concat(src).map(e => resolve(e))

  config.module.rules.push({
    test: /\.(js|jsx)$/,
    include: src,
    loader: 'babel-loader',
    options,
  })
}
