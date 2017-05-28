const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(env) {
    const filename = env.production ? '[hash].bundle.js' : 'bundle.js';
    const devtool = env.production ? false : 'cheap-eval-source-map';
    const plugins = [
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['public'], {
            root: resolve(__dirname, '../')
        })
    ];

    if (env.production) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: false
            })
        );

        plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        );
    }

    const conf = {
        entry: ['./game.js'],
        output: {
            filename,
            path: resolve(__dirname, '../public')
        },
        devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins
    };

    return conf;
};
