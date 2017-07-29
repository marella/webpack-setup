const babel = require('./babel')

module.exports = (config, settings, src, options = {}) => {
  options = Object.assign(
    {
      presets: ['react-app'],
    },
    options
  )

  babel(config, settings, src, options)
}
