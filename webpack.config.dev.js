var path = require('path');
var webpack = require('webpack');

var plexiConfig = {
  name: 'plexi',
  entry: [
    './src/Plexi',
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'Plexi.js',
    library: 'Plexi',
    libraryTarget: 'var',
  },
  plugins: [

  ],
  resolve: {
    root: path.join(__dirname, 'src'),
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};

var appConfig = {
  name: 'app',
  entry: [
    './app',
  ],
  output: {
    filename: 'App.js',
    path: path.join(__dirname, 'dist'),
    library: 'App',
    libraryTarget: 'var',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        //loader: 'babel-loader',
        //query: {
          //plugins: ['transform-runtime'],
          //presets: ['es2015', 'stage-0']
        //}

      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.svg/,
        loader: 'file?name=[name].[ext]',
      },

    ],
  },

};

module.exports = [appConfig, plexiConfig];
