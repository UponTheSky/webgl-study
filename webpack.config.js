const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: "inline-source-map",
  devServer: {
    static: './dist'
  },
  module: {
    rules: [
        {
            exclude: /node_modules/,
            use: 'ts-loader'
        }
    ],
  },
  resolve: {
      extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'WebGL Study',
    }),
  ],
};
