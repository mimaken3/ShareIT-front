const path = require("path");
const environment = process.env.NODE_ENV || "dev";

module.exports = {
  entry: [
    // polyfill はIE11などで必要
    "@babel/polyfill",
    "./src/index.js",
  ],
  output: {
    path: path.resolve(__dirname, "./dest"),
    filename: "bundle.js",
  },

  // 環境変数ファイルの読み込み
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
            presets: [
              // プリセットを指定することで、ES2020 を ES5 に変換
              "@babel/preset-env",
              // React の JSX を解釈
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    historyApiFallback: true,
    contentBase: "dest",
    compress: false,
    port: 8088,
    host: "localhost",
    open: true,
  },
};
