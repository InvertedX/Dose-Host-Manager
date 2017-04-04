const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
};

module.exports = merge(config, {
  debug: true,
  devtool: 'cheap-eval-source-map',
  entry: {
    application: 'index',
    vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux']
  },
  plugins: [

    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new CopyWebpackPlugin([
      {from: 'src/package.json', to: 'package.json'},
      {from: 'src/main.prd.js', to: 'main.js'}
    ]),
    new ExtractTextPlugin({
      filename: 'css/app.css',
      allChunks: true
    })
  ],
  module: {
    noParse: /\.min\.js$/,
    loaders: [
      // Sass
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../src/css'),
          path.resolve(__dirname, '../src')
        ],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: [
            {loader: 'css', query: {sourceMap: true}},
            'postcss',
            {loader: 'sass', query: {outputStyle: 'compressed'}}
          ]
        })
      },
      {
        test: /.js/,
        loader: 'babel',
        include: [path.resolve(__dirname, '../src')]

      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: ['css', 'postcss']
        })
      }
    ]
  },
  target: "electron-renderer"
});
