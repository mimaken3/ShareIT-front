const path = require("path");
const webpack = require("webpack");
const environment = process.env.NODE_ENV;

module.exports = {
  entry: [
    "@babel/polyfill", // polyfill はIE11などで必要
    "./src/index.js",
  ],
  // --modeで指定したものがNODE_ENVになるのを防ぐ
  optimization: {
    nodeEnv: false,
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/", // ブラウザからバンドルにアクセスする際のパス
  },

  // 環境変数ファイルの読み込みと絶対パスのエイリアス
  resolve: {
    alias: {
      env$: path.resolve(__dirname, `.env/${environment}.js`),
      src: path.resolve(__dirname, "./src"),
      Actions: path.resolve(__dirname, "./src/actions"),
      Reducers: path.resolve(__dirname, "./src/reducers"),
      Modules: path.resolve(__dirname, "./src/modules"),
      Organisms: path.resolve(
        __dirname,
        "./src/components/container/organisms"
      ),
      Templates: path.resolve(
        __dirname,
        "./src/components/container/templates"
      ),
      Atoms: path.resolve(__dirname, "./src/components/presentational/atoms"),
      Molecules: path.resolve(
        __dirname,
        "./src/components/presentational/molecules"
      ),
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
      {
        test: /\.css$/,
        use: [
          // 読み込んだスタイルをstyle要素としてページに反映させる
          { loader: "style-loader" },
          //  cssファイルを読み込む
          { loader: "css-loader" },
          // sass
          // { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        // 画像ファイルをDataURL化して.jsファイルとして読み込む
        use: [{ loader: "url-loader" }],
      },
    ],
  },

  // webpack-dev-server用設定
  devServer: {
    historyApiFallback: true, // HTML5 の History API を使用する
    contentBase: "public", // サーバーの起点とするディレクトリ
    compress: false, // gzip圧縮するか
    port: 8088,
    host: "localhost",
    open: true, //ブラウザを自動で開く
    watchContentBase: true, //コンテンツの変更監視をする
  },

  // ロジック内でprocess.env.NODE_ENVを利用するため
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
