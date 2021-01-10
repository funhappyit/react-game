const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  devtool: "eval", //개발용일때=> hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"], //형태
  },
  entry: {
    app: "./client",
  },
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
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"), //경로
  },
};
