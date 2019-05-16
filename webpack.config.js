require('dotenv').config();
const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const root = __dirname.substring(0, __dirname.lastIndexOf('/') + 1);

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:/]+/g) || [];
    }
}
module.exports = {
    mode: process.env.NODE_ENV ? 'development' : 'production',
    entry: {
        index: [
            'webpack-hot-middleware/client?reload=true',
            './client/index.js'
        ]
    },
    output: {
        path: path.resolve(root, 'public/'),
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
            ),
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ['html', 'js', 'css']
                }
            ]
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
