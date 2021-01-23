const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  mode: "development", //실서비스 : production
  devtool: "eval", //빠르개
  resolve: {
    extensions: [".js", ".jsx"], //형태
  },
  entry: {
    app: "./client",
  }, //입력
  //연결해주는것 module에 적용한 후 output에 뺀다
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR", "last 2 chrome versions"], //browerslist
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"), //경로
    filename: "app.js",
    publicPath: "/dist/",
  }, //출력
  //dev서버 설정-> dist폴더에 결과물을 저장해준다. 변경점 감지해 줄 수 있음
  devServer: {
    publicPath: "/dist/",
    hot: true,
  },
};
