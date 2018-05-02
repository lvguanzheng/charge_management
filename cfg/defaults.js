const path = require('path')
const webpack = require('webpack')
const srcPath = path.join(__dirname, '../src')
const dfltPort = 8226
const publicPath = '/assets/'

function getDefaultModules() {
    return {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     include: [srcPath],
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            // },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.(mp4|ogg)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ],
            },
        ],
    }
}

const getDefaultPlugins = () => [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllReferencePlugin({
            context: path.join(__dirname, "/../dist/"),
            manifest: require("../dist/assets/vendor-manifest.json")
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     names: ['vendor', 'manifest']
    // }),
]
const vendor = ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-saga', 'reselect'
                ,'redux-actions', 'antd', 'classnames']

module.exports = {
    srcPath,
    port: dfltPort,
    getDefaultModules,
    getDefaultPlugins,
    publicPath,
    vendor,
}
