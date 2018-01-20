const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { resolve } = require('./helpers')

module.exports = (config, settings, src, dst, options = {}) => {
  const { production, sourcemaps, versioning } = settings
  src = [].concat(src).map(e => resolve(e))
  options = Object.assign(
    {
      precision: 8,
      sourcemaps: !!sourcemaps,
      includePaths: src,
    },
    options
  )

  const extractStyles = new ExtractTextPlugin({
    filename:
      `${dst}/` + (versioning ? '[name].[contenthash:8].css' : '[name].css'),
    allChunks: true,
    disable: !production,
  })

  config.module.rules.push({
    test: /\.(css|sass|scss)$/,
    loader: extractStyles.extract({
      fallback: require.resolve('style-loader'),
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            sourceMap: options.sourcemaps,
            minimize: {
              autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 2 versions'],
              },
              discardComments: {
                removeAll: true,
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
          loader: require.resolve('sass-loader'),
          options: options,
        },
      ],
    }),
  })

  config.plugins.push(extractStyles)
}
