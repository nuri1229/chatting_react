const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const S3UploadPlugin = require('./s3.upload.plugin');

module.exports = (env, argv) => {
  return {
    mode: 'production',
    entry: ['./src/index.tsx'],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        // todo(선택) : import시 경로를 줄여 사용할 키워드를 입력합니다. 예) global: path.resolve(__dirname, 'src/global/')
      }
    },
    output: {
      path: path.join(__dirname, '/dist'),
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
      new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['dist'] }),
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
      new UglifyJSPlugin(),
      // todo: production용으로 빌드한 파일을 S3에 올릴 경우 필요한 정보를 인자로 전달합니다.
      new S3UploadPlugin('bucket name', 'S3 folder', 'dist')
    ]
  };
};
