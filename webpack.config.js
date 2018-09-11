"use strict";
__dirname = __dirname.charAt(0).toUpperCase() + __dirname.slice(1);
var outDir = __dirname + "/build/";

var webpack = require("webpack");
// import webpack from "webpack";
// var pkg = require("./package.json");
// var path = require("path");
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var CompressionPlugin = require("compression-webpack-plugin");

const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

var currentStage = "production"; //;"production"; //development
var compileServer = false;
var compileClient = true;
var compileDatabase = false;

var fs = require("fs");
var nodeModules = {};
var vendor = [
  "babel-polyfill",
  "react",
  "react-dom",
  "bluebird",
  "office-ui-fabric-react",
  "react-router",
  "react-router-dom",
  "moment",
  "chart.js",
  "react-chartjs-2",
  "axios",
  "@uifabric/icons"
];
fs.readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    if (vendor.indexOf(mod) < 0) {
      nodeModules[mod] = "commonjs " + mod;
    }
  });

var dbConnection = "mongodb://localhost:27017";
var exportWebpack = [];

if (!!compileServer) {
  var serverJs = {
    mode: currentStage,
    externals: nodeModules,
    name: "nodejs",
    target: "node",
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
    },
    entry: {
      app: ["./src/global/server.tsx"]
    },
    devtool: "none", // "#source-map",
    output: {
      pathinfo: true,
      path: outDir,
      filename: "[name].js",
      chunkFilename: "[name].js"
    },
    plugins: [
      new HardSourceWebpackPlugin(),
      // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
      new webpack.ProvidePlugin({
        Promise: "bluebird"
      }),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify(1.0),
        MONGO_DB_CONNECTION_STRING: JSON.stringify(dbConnection),
        MONGO_DB_DATABASE_STRING: JSON.stringify("homeautomation"),
        MONGO_DB_SENSOR_COLLECTION_STRING: JSON.stringify("sensors"),
        MONGO_DB_APPLICATION_COLLECTION_STRING: JSON.stringify("application"),
        MONGO_DB_CONFIGURATION_COLLECTION_STRING: JSON.stringify("configuration"),
        MONGO_DB_MERGED_SENSOR_DATA_COLLECTION_STRING: JSON.stringify("sensordata"),
        MONGO_DB_FILIALEN_COLLECTION_STRING: JSON.stringify("filialen"),
        MONGO_DB_ROUTEN_COLLECTION_STRING: JSON.stringify("routen"),
        "process.env": {
          NODE_ENV: JSON.stringify(currentStage)
        }
      }),
      new WebpackNotifierPlugin({ title: "Webpack Build finished" }),
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
          exclude: /(node_modules)/,
          use: [
            {
              loader: "thread-loader",
              options: {
                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                // workers: require('os').cpus().length - 1,
                workers: require("os").cpus().length - 1 // fastest build time for devServer: 3 threads; for production: 7 threads (os cpus minus 1)
              }
            },
            {
              loader: "ts-loader",
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
                happyPackMode: true
              }
            }
          ]
        }
        // {
        //   test: /\.tsx?$/,
        //   loader: "awesome-typescript-loader",
        //   exclude: /(node_modules)/
        // },
        // {
        //   test: /\.js(x)$/,
        //   loader: "babel-loader",
        //   exclude: /node_modules/,
        //   query: {
        //     cacheDirectory: "babel_cache",
        //     compact: false,
        //     presets: ["env", "react"] //env es2015
        //   }
        // },
        // {
        //   test: require.resolve("react"),
        //   loader: "expose-loader?React!react"
        // },
        // {
        //   test: /\.css$/,
        //   include: /node_modules/,
        //   loaders: ["style-loader", "css-loader"]
        // }
        // {
        //   test: /\.less$/,
        //   loader: "style-loader!css-loader!less-loader"
        // },
        // {
        //   test: /\.(png|jpg)$/,
        //   loader: "url-loader?limit=25000"
        // },
        // {
        //   test: /\.scss$/,
        //   loaders: ["style-loader", "css-loader", "sass-loader"]
        // },
        // {
        //   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: "url-loader?limit=10000&mimetype=application/font-woff"
        // },
        // {
        //   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: "url-loader?limit=10000&mimetype=application/font-woff"
        // },
        // {
        //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        // },
        // {
        //   test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        //   loader: "url-loader?limit=100000"
        // }
      ]
    }
  };
  exportWebpack.push(serverJs);
}
if (!!compileClient) {
  var clientJs = {
    mode: currentStage,
    name: "normal",
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
    },
    entry: {
      application: ["./src/global/components/pages/initApp.tsx"]
    },
    devtool: "#source-map",
    output: {
      pathinfo: true,
      path: outDir,
      filename: "js/[name].js",
      chunkFilename: "js/[name].js"
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all"
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor.bundle",
            chunks: "all"
          }
        }
      }
    },
    plugins: [
      new HardSourceWebpackPlugin(),
      // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
      new BundleAnalyzerPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de.js/),
      new webpack.ProvidePlugin({
        Promise: "bluebird"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(currentStage)
        }
      }),
      new WebpackNotifierPlugin({ title: "Webpack Build finished" }),
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
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: "vendor",
      //   filename: "js/vendor.bundle.js"
      // }),
      new CopyWebpackPlugin([
        {
          from: "./node_modules/office-ui-fabric-react/dist/css/fabric.css",
          to: "css"
        },
        { from: "./src/global/css", to: "css" },
        { from: "./src/global/views", to: "views" },
        { from: "./src/global/icons", to: "icons" }
      ])
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "thread-loader",
              options: {
                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                // workers: require('os').cpus().length - 1,
                workers: require("os").cpus().length - 1 // fastest build time for devServer: 3 threads; for production: 7 threads (os cpus minus 1)
              }
            },
            {
              loader: "ts-loader",
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
                happyPackMode: true
              }
            }
          ]
        },
        // {
        //   test: /\.tsx?$/,
        //   loader: "awesome-typescript-loader",
        //   exclude: /(node_modules)/
        // },
        // {
        //   test: /\.js(x)$/,
        //   loader: "babel-loader",
        //   exclude: /node_modules/,
        //   query: {
        //     cacheDirectory: "babel_cache",
        //     compact: false,
        //     presets: ["es2015", "react"]
        //   }
        // },
        // {
        //   test: require.resolve("react"),
        //   loader: "expose-loader?React!react"
        // },
        {
          test: /\.css$/,
          include: /node_modules/,
          loaders: ["style-loader", "css-loader"]
        }
        //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        // {
        //   test: /\.less$/,
        //   loader: "style-loader!css-loader!less-loader"
        // },
        // {
        //   test: /\.(png|jpg)$/,
        //   loader: "url-loader?limit=25000"
        // },
        // {
        //   test: /\.scss$/,
        //   loaders: ["style-loader", "css-loader", "sass-loader"]
        // },
        // {
        //   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: "url-loader?limit=10000&mimetype=application/font-woff"
        // },
        // {
        //   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: "url-loader?limit=10000&mimetype=application/font-woff"
        // },
        // {
        //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        // },
        // {
        //   test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        //   loader: "url-loader?limit=100000"
        // }
      ]
    }
  };
  exportWebpack.push(clientJs);
}
if (!!compileDatabase) {
  var serverJs = {
    mode: currentStage,
    externals: nodeModules,
    name: "nodejs",
    target: "node",
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
    },
    entry: {
      database: ["./src/global/mongoDB/cleanSensorData.ts"],
      rechnungen: ["./src/global/mongoDB/createRechnungen.ts"]
    },
    devtool: "none", // "#source-map",
    output: {
      pathinfo: true,
      path: outDir,
      filename: "[name].js",
      chunkFilename: "[name].js"
    },
    plugins: [
      new HardSourceWebpackPlugin(),
      // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
      new webpack.ProvidePlugin({
        Promise: "bluebird"
      }),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify(1.0),
        MONGO_DB_CONNECTION_STRING: JSON.stringify(dbConnection),
        MONGO_DB_DATABASE_STRING: JSON.stringify("homeautomation"),
        MONGO_DB_SENSOR_COLLECTION_STRING: JSON.stringify("sensors"),
        MONGO_DB_MERGED_SENSOR_DATA_COLLECTION_STRING: JSON.stringify("sensordata"),
        MONGO_DB_APPLICATION_COLLECTION_STRING: JSON.stringify("application"),
        MONGO_DB_CONFIGURATION_COLLECTION_STRING: JSON.stringify("configuration"),
        MONGO_DB_FILIALEN_COLLECTION_STRING: JSON.stringify("filialen"),
        MONGO_DB_ROUTEN_COLLECTION_STRING: JSON.stringify("routen"),
        "process.env": {
          NODE_ENV: JSON.stringify(currentStage)
        }
      }),

      new WebpackNotifierPlugin({ title: "Webpack Build finished" }),
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
          exclude: /(node_modules)/,
          use: [
            {
              loader: "thread-loader",
              options: {
                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                // workers: require('os').cpus().length - 1,
                workers: require("os").cpus().length - 1 // fastest build time for devServer: 3 threads; for production: 7 threads (os cpus minus 1)
              }
            },
            {
              loader: "ts-loader",
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
                happyPackMode: true
              }
            }
          ]
        }
        // {
        //   test: /\.tsx?$/,
        //   loader: "awesome-typescript-loader",
        //   options: {
        //     instance: "server",
        //     configFile: "tsconfig.json"
        //   },
        //   exclude: /(node_modules)/
        // },
        // {
        //   test: /\.js(x)$/,
        //   loader: "babel-loader",
        //   exclude: /node_modules/,
        //   query: {
        //     cacheDirectory: "babel_cache",
        //     compact: false,
        //     presets: ["env", "react"]
        //   }
        // }
      ]
    }
  };
  exportWebpack.push(serverJs);
}
module.exports = exportWebpack;
