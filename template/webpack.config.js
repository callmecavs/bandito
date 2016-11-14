'use strict'

const path = require('path')
const webpack = require('webpack')

const isProd = process.argv.includes('--prod')

const config = {
  context: __dirname + '/src',

  entry: {
    app: './main.js'
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/static'
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
                'latest',
                'stage-0',
                'react',

                ...!isProd ? [] : [
                  'react-optimize'
                ]
              ],
              plugins: [
                'transform-runtime',

                ...isProd ? [] : [
                  'transform-react-jsx-source',
                  'transform-react-jsx-self'
                ]
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

  devtool: isProd ? false : 'cheap-module-eval-source-map',

  devServer: {
    contentBase: __dirname + '/src',
    port: 3000
  },

  target: 'web'
}

module.exports = config
