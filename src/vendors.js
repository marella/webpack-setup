const webpack = require('webpack')

module.exports = (config, settings, vendors = []) => {
  let bundles = settings.bundles.slice()

  if (vendors && vendors.length) {
    bundles.unshift('vendor')
    config.entry.vendor = vendors
  }

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({ names: bundles })
  )
}
