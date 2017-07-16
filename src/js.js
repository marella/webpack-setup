const webpack = require('webpack')
const { resolve } = require('./helpers')

module.exports = (config, settings, src, dst) => {
  src = [].concat(src).map(e => resolve(e))

  config.entry[settings.main].push(...src)
  config.output.filename = dst + '/' + (settings.versioning ? '[name].[chunkhash:8].js' : '[name].js')
}
