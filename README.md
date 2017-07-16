# webpack-setup

Simple webpack config for React and Sass applications.

<!-- TOC depthFrom:2 depthTo:3 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installation](#installation)
- [Example](#example)
- [Documentation](#documentation)
	- [Available Methods](#available-methods)
	- [Custom Config](#custom-config)
- [License](#license)

<!-- /TOC -->

## Installation

```bash
npm install --save-dev webpack-setup
```


## Example

*webpack.config.js*

```js
const setup = require('webpack-setup')

setup
  .init({
    output: 'dist',
  })
  .js('src/index.js', 'js')
  .react('src')
  .sass('src/styles', 'css')

module.exports = setup.config
```


## Documentation

The first method `init()` initializes the config object using the provided `settings`. Rest of the methods update the config object by adding rules, loaders, plugins etc. The `setup.config` is the webpack config object that should be exported at the end.

Default `settings`:

```js
{
  base: '/', // base public path on server where you will host the application
  bundles: [], // names passed to CommonsChunkPlugin
  env: process.env.NODE_ENV, // 'development' or 'production'
  main: 'app', // key name for main entry point NOT the actual file path
  modules: [], // to resolve absolute imports
  output: 'dist', // directory to save the final build
  polyfill: false, // when true uses 'babel-polyfill' or you can provide a file path to your custom polyfill
  production: process.env.NODE_ENV === 'production', // when true runs some optimizations which can be slow for development
  versioning: process.env.NODE_ENV === 'production', // when true adds [hash] to output filenames. useful for cache busting on production but can be slow for development
  sourcemaps: process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map', // whether to generate sourcemaps or not
}
```

### Available Methods

#### `define(globals = {})`

List of globals passed to `DefinePlugin`.

```js
setup
  .define({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
  })
```

#### `env(env, match = true)`

Useful for writing environment specific config using `process.env.NODE_ENV`:

```js
setup
  .env('development')
  .server() // called only when env is development
  .hot() // called only when env is development

  .env('production')
  .uglify() // called only when env is production

  .env('any')
  .notify() // called always
```

#### `externals(externals)`

Dependencies to exclude from output bundles.

```js
setup
  .externals({
    jquery: 'jQuery',
  })
```

#### `fonts(dst, options = {})`

Configures `url-loader` to load fonts. `dst` specifies the output directory of font files relative to the `settings.output` directory. `options` object is passed to `url-loader`.

```js
setup
  .fonts('fonts')
```

#### `hot()`

Enables HMR using `HotModuleReplacementPlugin`.

```js
setup
  .hot()
```

#### `html(src, options = {})`

Specify the file using `src` that should be loaded using `HtmlWebpackPlugin`. `options` object is passed to the plugin.

```js
setup
  .html('public/index.html')
```

#### `images(dst, options = {})`

Configures `url-loader` to load images. `dst` specifies the output directory of image files relative to the `settings.output` directory. `options` object is passed to `url-loader`.

```js
setup
  .images('img')
```

#### `init(settings = {})`

The first method that should be called to initialize the config object.

```js
setup
  .init({
    output: 'dist',
  })
```

#### `js(src, dst)`

Specify the entry point using `src` and output directory of compiled JS files using `dst`. Output directory is relative to the `settings.output` directory.

```js
setup
  .js('src/index.js', 'js')
```

#### `notify(options = {})`

Configures `WebpackNotifierPlugin` using `options` object. Displays a desktop notification after every compilation.

```js
setup
  .notify()
```

#### `react(src)`

Configures `babel-loader` to compile JSX. `src` specifies the directory paths to include for compilation.

```js
setup
  .react('src')
```

#### `sass(src, dst, options = {})`

Configures `sass-loader` using `src` as `includePaths` and `dst` as output directory of compiled CSS files. Output directory is relative to the `settings.output` directory. `options` object is passed as `sass-loader` options.

```js
setup
  .sass('src/styles', 'css')
```

#### `server(options = {})`

Configures `webpack-dev-server` using `options` object.

```js
setup
  .server()
```

#### `settings(values = {})`

Overrides the initial `settings` with provided `values`. Methods called before `settings()` are not affected.

```js
setup
  .first()
  .settings({
    foo: 'bar'
  })
  // this affects only second() and third() NOT first() as it was already called
  .second()
  .third()
```

#### `uglify(options = {})`

Configures `UglifyJsPlugin` using `options` object.

```js
setup
  .uglify()
```

#### `vendors(vendors = [])`

List of modules that should be bundled into a separate `vendor.js` file.

```js
setup
  .vendors([
    'react',
    'react-dom',
  ])
```

### Custom Config

You may modify the config object before exporting to add custom rules or plugins that are not provided by `webpack-setup`:

```js
const { config } = setup.config

// Add custom rules or plugins here.

module.exports = config
```


## License

[MIT License][license].


[license]: /LICENSE
