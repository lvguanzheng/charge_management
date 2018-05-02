const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./base')
const defaultSettings = require('./defaults')

const plugins = defaultSettings.getDefaultPlugins().concat([
    new webpack.HotModuleReplacementPlugin(),
])
const modules = defaultSettings.getDefaultModules()
modules.rules = modules.rules.concat([
                    {
                        test: /\.(js|jsx)$/,
                        use: [
                            {
                                loader: 'react-hot-loader/webpack',
                            },
                            {
                                loader: 'babel-loader',
                            },
                        ],
                        include: [path.join(__dirname, '../src')],
                    },
                    {
                        test: /\.css$/,
                        use: [
                                'style-loader',
                                'css-loader',
                                'less-loader'
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                                'style-loader',
                                'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
                                'less-loader'
                        ],
                        include: [path.join(__dirname, '../src')],
                    },
                    {
                        test: /\.less$/,
                        use: [
                                'style-loader',
                                'css-loader',
                                'less-loader'
                        ],
                        include: [path.join(__dirname, '../node_modules')],
                    },
                ])
const config = Object.assign({}, baseConfig, {
    entry: {
        index:[
            'webpack-dev-server/client?http://0.0.0.0:' + defaultSettings.port,
            'webpack/hot/only-dev-server',
            './src/index'
        ],
        // vendor: defaultSettings.vendor,
    },
    output: {
        path: path.join(__dirname, '/../dist/assets/'),
        filename: '[name].js',
        publicPath: `.${defaultSettings.publicPath}`,
    },
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    plugins,
    module: modules,
})

module.exports = config
