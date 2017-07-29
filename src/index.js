const tools = {
  babel: require('./babel'),
  copy: require('./copy'),
  define: require('./define'),
  externals: require('./externals'),
  fonts: require('./fonts'),
  html: require('./html'),
  hot: require('./hot'),
  images: require('./images'),
  initialize: require('./initialize'),
  js: require('./js'),
  notify: require('./notify'),
  react: require('./react'),
  sass: require('./sass'),
  server: require('./server'),
  settings: require('./settings'),
  uglify: require('./uglify'),
  vendors: require('./vendors'),
}

class Api {
  constructor() {
    this.config = {}

    this._settings = {
      base: '/',
      bundles: [],
      env: process.env.NODE_ENV,
      main: 'app',
      modules: [],
      output: 'build',
      polyfill: false,
      production: process.env.NODE_ENV === 'production',
      versioning: process.env.NODE_ENV === 'production',
      sourcemaps:
        process.env.NODE_ENV === 'production'
          ? false
          : 'cheap-module-source-map',
    }

    for (let name in tools) {
      this[name] = (...args) => {
        tools[name](this.config, this._settings, ...args)
        return this
      }
    }

    this.init = (settings = {}, ...args) => {
      this.settings(settings)
      this.initialize(...args)
      return this
    }

    this.when = this.when.bind(this)
  }

  when(env, match = true) {
    if (env === 'any' || env === process.env.NODE_ENV === match) {
      return this
    }

    const me = this
    const fake = new Proxy(
      {
        when: me.when,
      },
      {
        get(target, name) {
          return name in target ? target[name] : () => fake
        },
      }
    )
    return fake
  }
}

module.exports = new Api()
