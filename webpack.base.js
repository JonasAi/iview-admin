const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
    plugins: [new HtmlWebpackPlugin({
            filename: '../../html/index.html',
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
                test: /\.(less|css)$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }]
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