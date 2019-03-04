/**
 * @file webpack 配置文件
 * @author zhanglu
 * @data 2018
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    // 指定模式
    mode: 'development',

    // 项目入口
    entry: path.join(__dirname, 'src/main.js'),

    // 项目build后的文件地址
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/main.[hash].js'
    },

    // 开发时助于debugger
    devtool: 'source-map',

    // webpack内置的node服务
    devServer: {
        contentBase: './',
        inline: true,
        port: 8080,
        compress: false,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.md$/,
                exclude: /node_modules/,
                loader: 'babel-loader!markdown-it-react-loader'
            }
        ]
    },
    plugins: [

        // 生成html文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        }),

        // 提取css
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),

        // webpack热更新，不需要手动刷新页面
        new webpack.HotModuleReplacementPlugin(),

        // 清除dist文件
        new CleanWebpackPlugin(['dist']),

        // 复制静态文件到build后的文件夹
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '/src/static'),
                to: path.join(__dirname, '/dist/static')
            }
        ])
    ]
};
