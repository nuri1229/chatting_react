const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const S3UploadPlugin = require('./s3.upload.plugin');

module.exports = (env, argv) => {
  return {
    mode: 'development',
    entry: ['./src/index.tsx'],
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        // todo(선택) : import시 경로를 줄여 사용할 키워드를 입력합니다. 예) global: path.resolve(__dirname, 'src/global/')
      }
    },
    output: {
      // todo : develop용으로 빌드된 파일이 들어갈 폴더를 지정합니다.
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
      // new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['/dev output folder name'] }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      // todo(선택): 이미지 파일 등 정적 파일을 S3로부터가 아닌 asset폴더에 넣어 사용할 경우 설정합니다.
      // new CopyWebpackPlugin([
      //   {
      //     from: './src/asset',
      //     to: 'asset'
      //   }
      // ]),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      // todo: develop용으로 빌드한 파일을 S3에 올릴 경우 필요한 정보를 인자로 전달합니다.
      new S3UploadPlugin('bucket name', 'S3 folder', 'dev output folder name')
    ]
  };
};
