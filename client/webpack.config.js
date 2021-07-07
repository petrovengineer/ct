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
  module: {
    rules: [
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
          test: /\.jsx?$/,
          // exclude: /(node_modules)/,
          loader: "babel-loader",
          // options:{
          //   assumptions: {
          //     "setPublicClassFields": true
          //   },
          //   plugins: ["@babel/plugin-proposal-decorators", {legacy: true, decoratorsBeforeExport: true} ],
          //   presets:["@babel/preset-env", "@babel/preset-react"],
          // }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'Claim Tracker',
      filename: 'index.html',
      template: 'app/template.html'
  })],
};