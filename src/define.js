const webpack = require('webpack')

module.exports = (config, settings, globals = {}) => {
  globals = Object.assign(
    {
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    },
    globals
  )

  config.plugins.push(new webpack.DefinePlugin(globals))
}
