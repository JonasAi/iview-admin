const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: {
        index: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, './html/static'),
        publicPath: '/static/',
        filename: '[name].js',
        chunkFilename: '_[name]-[chunkhash:4].js'
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [
                        autoprefixer({
                            browsers: ['last 2 versions', 'Android >= 4.0']
                        })
                    ]
                }
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    name: '[hash:10].[ext]',
                    limit: 4096
                }
            }, {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }, {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            }, {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    formatter: require('eslint-friendly-formatter') //错误输出格式
                }
            }
        ]
    }
}