const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  return {
    mode: 'development',
    entry: ['./src/index.tsx'],
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        global: path.resolve(__dirname, 'src/global/')
      }
    },
    output: {
      path: path.join(__dirname, '/dev output folder name'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            limit: 10000
          }
        }
      ]
    },
    plugins: [
      // todo(선택) : CleanWebpackPlugin을 사용하는 경우, develop용으로 빌드된 파일이 들어가는 폴더를 입력합니다.
      // new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['/dev output folder name']}),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CopyWebpackPlugin([
        {
          from: './src/asset',
          to: 'asset'
        }
      ]),
      new MiniCssExtractPlugin({ filename: '[name].css' })
    ],
    devServer: {
      historyApiFallback: true,
      disableHostCheck: true,
      port: 3000
    }
  };
};
