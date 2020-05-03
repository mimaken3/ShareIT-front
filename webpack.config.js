const path = require("path");
var webpack = require("webpack");
const environment = process.env.NODE_ENV || "dev";

module.exports = {
  //   entry: "./src/index.js",
  //   entry: ["@babel/polyfill", "./src/index.js"],
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "./dest"),
    filename: "bundle.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  resolve: {
    alias: {
      env$: path.resolve(__dirname, `.env/${environment}.js`),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: "dest",
    compress: false,
    port: 8088,
    host: "localhost",
    open: true,
  },
};
