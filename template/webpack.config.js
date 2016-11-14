'use strict'

const path = require('path')
const webpack = require('webpack')

const isProd = process.argv.includes('--prod')

const config = {
  context: __dirname + '/src',

  entry: {
    app: './main.js'
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015'
              ]
            }
          }
        ]
      }, {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': !isProd ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      'DEV': !isProd
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true),

    ...!isProd ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true
        }
      })
    ]
  ],

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/static'
  },

  devServer: {
    contentBase: __dirname + '/src',
    port: 3000
  },

  target: 'web'
}

module.exports = config
