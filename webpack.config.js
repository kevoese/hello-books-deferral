require('dotenv').config();
const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: ['staging', 'review', 'production'].includes(process.env.NODE_ENV)
        ? 'production'
        : 'development',
    entry: {
        index: [
            'webpack-hot-middleware/client?reload=true',
            './client/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'server', 'public'),
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new PurgecssPlugin({
            paths: glob.sync(
                [
                    path.join(__dirname, 'client/**/*.js'),
                    path.join(__dirname, 'client/**/*.css')
                ],
                { nodir: true }
            )
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'app.css',
            chunkFilename: '[id].css'
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({}),
            new webpack.HotModuleReplacementPlugin()
        ]
    }
};
