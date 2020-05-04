const path = require("path");
const environment = process.env.NODE_ENV || "dev";

module.exports = {
  entry: [
    "@babel/polyfill", // polyfill はIE11などで必要
    "./src/index.js",
  ],
  output: {
    path: path.resolve(__dirname, "./dest"),
    filename: "bundle.js",
    publicPath: "/", // ブラウザからバンドルにアクセスする際のパス
  },

  // 環境変数ファイルの読み込みと絶対パスのエイリアス
  resolve: {
    alias: {
      env$: path.resolve(__dirname, `.env2/${environment}.js`),
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
    ],
  },

  // webpack-dev-server用設定
  devServer: {
    historyApiFallback: true,
    contentBase: "dest", // サーバーの起点とするディレクトリ
    compress: false, // gzip圧縮するか
    port: 8088,
    host: "localhost",
    open: true, //ブラウザを自動で開く
    watchContentBase: true, //コンテンツの変更監視をする
  },
};
