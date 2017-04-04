// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require('path');
const webpack = require('webpack');
 
module.exports = {
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../build'),
        publicPath: '../'
    },
    resolve: {
        modules: [
            path.join(__dirname, '../src'),
            'node_modules'
        ],
        alias: {
            models: path.join(__dirname, '../src')
        },
        extensions: ['.js', '.jsx', '.json', '.scss']
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'  // fetch API
        }),
        // Shared code
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.bundle.js',
            minChunks: Infinity
        })
    ],
    module: {
        loaders: [
            // JavaScript / ES6
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src'),
                loader: 'babel'
            },
            // Images
            // Inline base64 URLs for <=8k images, direct URLs for the rest
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 8192,
                    name: 'images/[name].[ext]?[hash]'
                }
            },
            // Fonts
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader : 'url-loader',
                query: {
                    limit: 8192,
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        ]
    }

};
