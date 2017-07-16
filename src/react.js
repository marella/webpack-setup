const { resolve } = require('./helpers')

module.exports = (config, settings, src) => {
  src = [].concat(src).map(e => resolve(e))

  config.module.rules.push({
    test: /\.(js|jsx)$/,
    include: src,
    use: [{
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        plugins: [
          'babel-plugin-transform-class-properties',
          'babel-plugin-syntax-dynamic-import',
          [
            'babel-plugin-transform-runtime',
            {
              helpers: true,
              polyfill: false,
              regenerator: true,
            },
          ],
          [
            'babel-plugin-transform-object-rest-spread',
            {
              useBuiltIns: true,
            },
          ],
        ],
        presets: [
          'babel-preset-react',
          [
            'babel-preset-env',
            {
              modules: false,
              targets: {
                ie9: true,
              },
              uglify: true,
            },
          ],
        ]
      },
    }],
  })
}
