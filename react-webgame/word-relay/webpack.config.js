const path = require("path");
module.exports = {
  name: "wordrelay-setting",
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
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"), //경로
    filename: "app.js",
  }, //출력
};
