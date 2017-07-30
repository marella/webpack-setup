const { resolve } = require('./helpers')

module.exports = (config, settings, src, options = {}) => {
  src = [].concat(src).map(e => resolve(e))

  config.module.rules.push({
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    include: src,
    loader: require.resolve('eslint-loader'),
    options,
  })
}
