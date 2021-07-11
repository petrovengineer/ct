const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ["@babel/polyfill", './app/app.jsx'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    // open: true,
    hot: true
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',}
        ]
      },
      {
        test: /\.s[ac]ss$/,
          exclude: /\.module\.scss$/,
          use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                compileType: 'icss'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.module\.s[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                compileType: 'module'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
          test: /\.jsx?$/,
          loader: "babel-loader",
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'Claim Tracker',
      filename: 'index.html',
      template: 'app/template.html',
      favicon: "app/favicon.ico"
  })],
};