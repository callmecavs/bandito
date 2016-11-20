'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  DefinePlugin,
  LoaderOptionsPlugin,
  NamedModulesPlugin,

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
    extensions: ['.js', '.jsx', '.json', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
      }, {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 10000
            }
          }, {
            loader: 'image-webpack-loader',
            query: {
              interlaced: true,
              progressive: true,

              mozjpeg: {
                quality: '90'
              },

              pngquant: {
                quality: '90'
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'DEV': isDev,
      'PROD': isProd
    }),

    new LoaderOptionsPlugin({
      options: {
        postcss: [ require('autoprefixer')() ]
      }
    }),

    new NamedModulesPlugin(),

    new OccurrenceOrderPlugin(true),

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
