const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');

const cmsConfiguration = {
    entry: {
        app: './client/dashboard/src/app/root.module.js',
        vendor: 'angular'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, '/client', '/dashboard', '/src', '/app'),
            loader: 'babel-loader'
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: extractTextPlugin.extract({ fallback: 'style-loader', use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }] })

        }
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, '/client', '/dashboard', '/dist')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new extractTextPlugin("css/styles.css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

const blogConfiguration = {
    entry: {
        app: './client/blog/src/app/root.module.js',
        vendor: 'angular'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, '/client', '/blog', '/src', '/app'),
            loader: 'babel-loader'
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: extractTextPlugin.extract({ fallback: 'style-loader', use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }] })
        }]
    },
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, '/client', '/blog', '/dist')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new extractTextPlugin('css/styles.css'),
        new webpack.optimize.UglifyJsPlugin()        
        
    ]
};

module.exports = [cmsConfiguration, blogConfiguration];
