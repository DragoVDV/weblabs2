const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Добавляем правило для обработки CSS-файлов
        use: ["style-loader", "css-loader"], // Подключаем style-loader и css-loader
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Правило для обработки изображений
        use: [
          {
            loader: 'file-loader', // Используем file-loader для работы с изображениями
            options: {
              name: '[path][name].[ext]', // Сохраняем оригинальный путь и имя файла
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
  