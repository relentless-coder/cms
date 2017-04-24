const path = require('path');
const webpack = require('webpack');

const cmsConfiguration = {
    entry: {
        app: './client/dashboard/src/app/root.module.js',
        vendor: 'angular'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, '/client', '/dashboard', '/src', '/app'),
            loader: 'babel-loader'
        }]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/client', '/dashboard', '/dist', '/js')
    },
    plugins: [
       new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
    ]
}

const blogConfiguration = {
  entry: {
    app: './client/blog/src/app/root.module.js',
    vendor: 'angular'
  },
  module: {
      loaders: [{
          test: path.join(__dirname, '/client', '/blog', '/src', '/app'),
          loader: 'babel-loader'
      }]
  },
  output: {
      filename: '[name].js',
      path: path.join(__dirname, '/client', '/blog', '/dist', '/js')
  },
  plugins: [
     new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
  ]
}

module.exports = [cmsConfiguration, blogConfiguration]
