'use strict';

var
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './app/application.js'
  ],
  output: {
    path: __dirname + '/public',
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    contentBase: './',
    port: 3333,
    setup: (app) => {
      const dbRoute = __dirname + '/db';
      app
        .get('/api/window-sills', (req, res) => {
          res.sendFile(dbRoute + '/windowSill.json');
        })
        .get('/api/window-ledges', (req, res) => {
          res.sendFile(dbRoute + '/windowLedge.json');
        })
        .get('/api/window-reveals', (req, res) => {
          res.sendFile(dbRoute + '/windowReveal.json');
        })
        .get('/api/menu-items', (req, res) => {
          res.sendFile(dbRoute + '/menuItems.json');
        })
        .get('/api/windows', (req, res) => {
          res.sendFile(dbRoute + '/windows.json');
        })
        .get('/api/services', (req, res) => {
          res.sendFile(dbRoute + '/services.json');
        });
    }
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.hbs$/,
        exclude: /(node_modules)/,
        loader: 'handlebars-loader'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('package.css'),
    new webpack.HotModuleReplacementPlugin()
  ]
};
