const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = webpackMerge(webpackBase, {
    mode: 'production',
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true
                }
            }]
        }, ]
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(__dirname, './html/static')
        ], {
            exclude: ['vendor.dll.js', 'vendor.manifest.json'],
            verbose: true,
            dry: false
        }),
        new webpack.DllReferencePlugin({
            // name参数和dllplugin里面name一致，可以不传
            name: 'vendor',
            // dllplugin 打包输出的manifest.json
            manifest: require('./html/static/vendor.manifest.json'),
            // 和dllplugin里面的context一致
            context: path.join(__dirname, '..')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css'
        }),
        new OptimizeCss({ // 压缩提取的css
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true,
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(__dirname, './src/libs/template.ejs'),
            hash: true,
            minify: {
                //清除属性引号
                removeAttributeQuotes: true,
                //清除多余空格
                collapseWhitespace: true,
                //压缩javascript
                minifyJS: true
            },
            path: '/static/',
            title: '',
            //chunks: ['index']
        }),
    ]
})