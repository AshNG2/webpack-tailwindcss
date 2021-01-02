const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    app: './src/js/app'
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:3].js',
    path: path.resolve('app/assets')
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'app'),
  //   watchContentBase: true,
  //   writeToDisk: true,
  //   open: true,
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: path.resolve(__dirname, 'app'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyPlugin({ patterns: [
        { from: 'src/*.html', to: '../[name].html' },
        //{ from: 'src/img/', to: 'img', toType: 'dir' },
      ], })
  ],
  mode: prod ? 'production' : 'development'
};

module.exports = config;
