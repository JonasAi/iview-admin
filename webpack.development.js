const os = require('os')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const getIp = () => {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = webpackMerge(webpackBase, {
    mode: 'development',
    devServer: {
        contentBase: './html/',
        historyApiFallback: true,
        overlay: { warnings: false, errors: true },
        inline: true,
        hot: true,
        noInfo: true,
        host: getIp(),
        port: 3001,
        proxy: [{
            context: ['/v3', '/v2', '/xw', '/wap', '/wechat'],
            target: 'http://bm.jindanlicai.com:8463/',
            changeOrigin: true,
            cookieDomainRewrite: {
                "*": getIp()
            }
        }]
    },
    plugins: [
        
    ],
    devtool: '#source-map'
})