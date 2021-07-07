const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './app/app.jsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      },
      {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",   // определяем загрузчик
          options:{
              presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
          }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'Claim Tracker',
      filename: 'index.html',
      template: 'app/template.html'
  })],
};