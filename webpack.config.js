'use strict'

const path = require('path')
const webpack = require('webpack')

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
              presets: ['es2015']
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

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/static'
  },

  devServer: {
    contentBase: __dirname + '/src',
    port: 3000
  }
}

module.exports = config
