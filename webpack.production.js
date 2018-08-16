const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = webpackMerge(webpackBase, {
    mode: 'production',
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
        })
    ]
})