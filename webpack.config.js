const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')

// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'xy-ui.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract({
              use: [
                'css-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('sass'),
                  },
                },
              ],
              fallback: 'vue-style-loader',
            }),
          },
          extractCSS: true,
        },
        include: /src/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]',
      //     outputPath: 'images'
      //   }
      // },
      {
        test: /\.(gif|png|jpe?g|woff|svg|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          outputPath: 'images/',
          name: '[name].[ext]',
        },
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'xy-ui.css',
      allChunks: true,
    }),
    new VueLoaderPlugin(),
    // new CopyWebpackPlugin([
    // {
    //   from: 'src/lib/scss/_mixin.scss',
    //   to: '_mixin.scss',
    //   force: true
    // },
    // {
    //   from: 'src/lib/style/normalize-8.0.0.css',
    //   to: 'style/normalize-8.0.0.css',
    //   force: true
    // }
    // ])
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src'),
      // '@scss': path.resolve(__dirname, './src/lib/scss')
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    contentBase: './src',
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
  module.exports.mode = 'production'
  module.exports.entry = './src/lib/index.js'
  module.exports.output.filename = 'xy-ui.js'
  module.exports.output.library = 'xy-ui'
  module.exports.output.libraryTarget = 'umd'
  module.exports.output.umdNamedDefine = true
  module.exports.devtool = ''
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ])

  module.exports.optimization = {
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          cache: false,
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  }

  module.exports.externals = {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  }
}
