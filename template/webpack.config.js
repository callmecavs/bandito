'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  DefinePlugin,
  LoaderOptionsPlugin,

  optimize: {
    OccurrenceOrderPlugin,
    UglifyJsPlugin
  }
} = require('webpack')

const isDev  = !process.argv.includes('-p')
const isProd = !isDev

const config = {
  context: __dirname + '/src',

  entry: {
    main: './index.js'
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.json', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, '/src')
        ],
        use: [
          'babel-loader'
        ]
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }, {
        test: /\.json$/,
        use: [
          'json-loader'
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'DEV': isDev,
      'PROD': isProd
    }),

    new OccurrenceOrderPlugin(true),

    new LoaderOptionsPlugin({
      options: {
        postcss: [ require('autoprefixer')() ]
      }
    }),

    ...isDev ? [] : [
      new HtmlWebpackPlugin({
        inject: false,
        minify: {
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        template: 'index.html'
      }),

      new UglifyJsPlugin({
        compress: {
          screw_ie8: true
        }
      })
    ]
  ],

  cache: isDev ? true : false,

  devtool: isDev ? 'cheap-module-eval-source-map' : false,

  devServer: {
    contentBase: __dirname + '/src',
    port: 3000
  },

  target: 'web'
}

module.exports = config
