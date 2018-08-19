"use strict";
__dirname = __dirname.charAt(0).toUpperCase() + __dirname.slice(1);
var outDir = __dirname + "/build/";
//var path = require("path");
var webpack = require("webpack");
// import webpack from "webpack";
var pkg = require("./package.json");
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require("copy-webpack-plugin");
var WebpackNotifierPlugin = require("webpack-notifier");
//var CompressionPlugin = require("compression-webpack-plugin");
//var LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

var fs = require("fs");

var currentStage = "development"; //;"development"; //production
var nodeModules = {};
var compileServer = true;
var compileClient = true;
var compileDatabase = true;
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
    // else {
    //     console.log("Include " + mod);
    // }
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
          loader: "awesome-typescript-loader",
          exclude: /(node_modules)/
        },
        {
          test: /\.js(x)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            cacheDirectory: "babel_cache",
            compact: false,
            presets: ["env", "react"] //env es2015
          }
        },
        // {
        //   test: require.resolve("react"),
        //   loader: "expose-loader?React!react"
        // },
        {
          test: /\.css$/,
          include: /node_modules/,
          loaders: ["style-loader", "css-loader"]
        },
        //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        {
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader"
        },
        {
          test: /\.(png|jpg)$/,
          loader: "url-loader?limit=25000"
        },
        {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
          loader: "url-loader?limit=100000"
        }
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
      //   vendor: vendor
    },
    devtool: "#source-map",
    output: {
      pathinfo: true,
      path: outDir,
      filename: "js/[name].js",
      chunkFilename: "js/[name].js"
    },
    optimization: {
      minimize: false,
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
          loader: "awesome-typescript-loader",
          exclude: /(node_modules)/
        },
        {
          test: /\.js(x)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            cacheDirectory: "babel_cache",
            compact: false,
            presets: ["es2015", "react"]
          }
        },
        // {
        //   test: require.resolve("react"),
        //   loader: "expose-loader?React!react"
        // },
        {
          test: /\.css$/,
          include: /node_modules/,
          loaders: ["style-loader", "css-loader"]
        },
        //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        {
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader"
        },
        {
          test: /\.(png|jpg)$/,
          loader: "url-loader?limit=25000"
        },
        {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
          loader: "url-loader?limit=100000"
        }
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
          loader: "awesome-typescript-loader",
          options: {
            instance: "server",
            configFile: "tsconfig.json"
          },
          exclude: /(node_modules)/
        },
        {
          test: /\.js(x)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            cacheDirectory: "babel_cache",
            compact: false,
            presets: ["env", "react"]
          }
        }
      ]
    }
  };
  exportWebpack.push(serverJs);
}
module.exports = exportWebpack;
