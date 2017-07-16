const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { resolve } = require('./helpers')

module.exports = (config, settings, src, dst, options = {}) => {
  src = [].concat(src).map(e => resolve(e))

  options = Object.assign({
      precision: 8,
      sourcemaps: !!settings.sourcemaps,
      includePaths: src,
  }, options)

  const extractStyles = new ExtractTextPlugin({
    filename: dst + '/' + (settings.versioning ? '[name].[contenthash:8].css' : '[name].css'),
    allChunks: true,
    disable: !settings.production,
  })

  config.module.rules.push({
    test: /\.(sass|scss)$/,
    loader: extractStyles.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: options.sourcemaps,
            minimize: {
              autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 2 versions'],
              },
              discardComments: {
                removeAll : true,
              },
              discardUnused: false,
              mergeIdents: false,
              reduceIdents: false,
              safe: true,
              sourcemap: options.sourcemaps,
            },
          },
        },
        {
          loader: 'sass-loader',
          options: options,
        }
      ],
    })
  })

  config.plugins.push(extractStyles)
}
