const assign = require('object-assign');
const DefinePlugin = require("webpack/lib/DefinePlugin");
const NormalModuleReplacementPlugin = require("webpack/lib/NormalModuleReplacementPlugin");
const NoEmitOnErrorsPlugin = require("webpack/lib/NoEmitOnErrorsPlugin");
const path = require('path');
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (bundles, paths, prod, publicPath) => ({
    entry: assign({
        'webpack-dev-server': 'webpack-dev-server/client?http://0.0.0.0:8888', // WebpackDevServer host and port
        'webpack': 'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
    }, bundles),
    output: {
        path: paths.dist,
        publicPath,
        filename: "[name].js"
    },
    plugins: [
        new DefinePlugin({
            "__DEVTOOLS__": !prod
        }),
        new DefinePlugin({
          'process.env': {
            'NODE_ENV': prod ? '"production"' : '""'
          }
        }),
        new NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
          inject: true,
          template: paths.appHtml,
        })
    ].concat(prod ? [new ParallelUglifyPlugin({
        uglifyJS: {
            sourceMap: false,
            compress: {warnings: false},
            mangle: true
        }
    })] : []),
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        mimetype: "application/font-woff"
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: "[path][name].[ext]",
                        limit: 8192
                    }
                }] // inline base64 URLs for <=8k images, direct URLs for the rest
            },
            {
                test: /\.jsx$/,
                use: [{
                    loader: "react-hot-loader"
                }],
                include: paths.code
            }, {
                test: /\.jsx?$/,
                use: [{
                    loader: "babel-loader"
                }],
                include: paths.code
            }
        ]
    },
    devServer: {
        proxy: {
            '/dist/challenge/user': {
                changeOrigin: true,
                target: "https://cq10n3mf19.execute-api.eu-west-1.amazonaws.com/",
                pathRewrite: {'^/dist': ''},
                logLevel: 'debug'
            }

        }
    },

    devtool: !prod ? 'eval' : undefined
});
