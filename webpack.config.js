const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: [
        path.join(__dirname,'../app.js')
    ],
    output : {
        path : path.join(__dirname,'/dist/'),
        filename : '[name]-[hash]-min.js',
        publicPath : '/',
        chunkFilename : '[name].[chunkhash:5].chunk.js'
    },
    plugins : [
        new ExtractTextPlugin({
            filename : '[name]-[hash].min.css',
            allChunks: true
        }),
         new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    require('autoprefixer'),
                    require('precss'),
                    require('postcss-assets')
                ]
            }
        })
    ],
    module : {
        loaders : [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    "plugins": ["transform-decorators-legacy"],
                    "presets": ["es2015", "stage-0", "react"]
                }
            },
            {
                test: /.json?$/,
                loader: 'json'
            },   
             {
                test: /.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use : 'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader'
                })
            },
            {
                test: /.(png|svg|jpg|gif)$/,
                loader: 'file-loader'
            }
        ]
    }
}