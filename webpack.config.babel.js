import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const DEV_MODE = process.env.NODE_ENV !== 'production';
const SRC_DIR = join(__dirname, 'src');
const DIST_DIR = join(__dirname, 'dist/assets');
const PUBLIC_PATH = process.env.CDN_PATH || '/assets/';

module.exports = {
  mode: DEV_MODE ? 'development' : 'production',
  devtool: DEV_MODE ? 'cheap-eval-source-map' : 'source-map',
  target: 'web',
  entry: [
    DEV_MODE && 'webpack-hot-middleware/client?reload=true',
    join(SRC_DIR, 'client/index.js')
  ].filter(Boolean),
  output: {
    chunkFilename: '[id].chunk.js',
    filename: '[name].bundle.js',
    path: DIST_DIR,
    publicPath: PUBLIC_PATH
  },
  plugins: [
    DEV_MODE && new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src/client/views/index.html')
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify('simple-weather-app'),
      DEFAULT_CITY: JSON.stringify(process.env.DEFAULT_CITY || 'Atlanta'),
      NODE_ENV: JSON.stringify(DEV_MODE ? 'development' : 'production')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: DEV_MODE,
              minimize: !DEV_MODE,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      SRC_DIR,
      'node_modules'
    ]
  }
};
