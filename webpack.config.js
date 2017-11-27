'use strict';
__dirname = __dirname.charAt(0).toUpperCase() + __dirname.slice(1);
var outDir = __dirname + '/build/';
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackNotifierPlugin = require("webpack-notifier");
var CompressionPlugin = require("compression-webpack-plugin");
var LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
var currentStage = "development";//;"development"; //production
var fs = require('fs');

var nodeModules = {};
var vendor = ["babel-polyfill", "react", "react-dom", "bluebird", "office-ui-fabric-react", "react-router", "react-router-dom"];
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        if (vendor.indexOf(mod) < 0) {
            nodeModules[mod] = 'commonjs ' + mod;
        }
        // else {
        //     console.log("Include " + mod);
        // }
    });

module.exports = [{
    name: "normal",
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    entry: {
        application: ['./src/global/components/pages/initApp.tsx'],
        vendor: vendor
    },
    devtool: '#source-map',
    output: {
        pathinfo: true,
        path: outDir,
        filename: "js/[name].js",
        chunkFilename: "js/[name].js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'bluebird'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(currentStage)
            }
        }),
        new WebpackNotifierPlugin({ title: 'Webpack Build finished' }),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "js/vendor.bundle.js" }),
        new CopyWebpackPlugin([
            { from: './node_modules/office-ui-fabric-react/dist/css/fabric.css', to: "css" },
            { from: './src/global/css', to: "css" },
            { from: './src/global/views', to: "views" },
            { from: './src/global/icons', to: "icons" }
        ])
    ],
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.js?$/,
            //     loader: 'source-map-loader',
            //     exclude: /(node_modules)/,
            // },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /(node_modules)/
            }
        ],
        loaders: [
            {
                test: /\.js(x)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: 'babel_cache',
                    compact: false,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: require.resolve("react"),
                loader: "expose-loader?React!react"
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=25000'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
},
{
    externals: nodeModules,
    name: "nodejs",
    target: "node",
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    entry: {
        app: ['./src/global/server.tsx']
    },
    devtool: '#source-map',
    output: {
        pathinfo: true,
        path: outDir,
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'bluebird'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(currentStage)
            }
        }),

        new WebpackNotifierPlugin({ title: 'Webpack Build finished' }),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /(node_modules)/
            }
        ],
        loaders: [
            {
                test: /\.js(x)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: 'babel_cache',
                    compact: false,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: require.resolve("react"),
                loader: "expose-loader?React!react"
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=25000'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
}

];

// module.exports = exportWebpack;
