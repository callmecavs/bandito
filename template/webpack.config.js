'use strict'

const path = require('path')

const {
  DefinePlugin,
  LoaderOptionsPlugin,

  optimize: {
    DedupePlugin,
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
    publicPath: '/static'
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
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'latest',
                'stage-0',
                'react',

                ...isDev ? [] : [
                  'react-optimize'
                ]
              ],
              plugins: [
                'transform-runtime',
                'transform-decorators-legacy',

                ...isProd ? [] : [
                  'transform-react-jsx-source',
                  'transform-react-jsx-self'
                ]
              ]
            }
          }
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
      'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      'DEV': isDev
    }),

    new OccurrenceOrderPlugin(true),

    new LoaderOptionsPlugin({
      options: {
        postcss: [ require('autoprefixer')() ]
      }
    }),

    ...isDev ? [] : [
      new DedupePlugin(),
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
