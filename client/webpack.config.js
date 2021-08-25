const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = (env) => {
  const envFile = `${path.join(__dirname)}/.env${env.ENVIRONMENT==='production'?'':'.development'}`;
  const envFromFile = dotenv.config({path:envFile}).parsed;
  const envKeys = Object.keys(envFromFile).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envFromFile[next]);
    return prev;
  }, {});
  console.log("DEBUG ", envKeys)

  return {
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
      extensions: ["", ".js", ".jsx"],
      alias: {
        _components: path.resolve(__dirname, 'app/components/'),
        _store: path.resolve(__dirname, 'app/store/'),
        _pages: path.resolve(__dirname, 'app/pages/'),
        _app: path.resolve(__dirname, 'app/'),
        _hoc: path.resolve(__dirname, 'app/hoc'),
        _api: path.resolve(__dirname, 'app/api'),
      }
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
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Claim Tracker',
        filename: 'index.html',
        template: 'app/template.html',
        favicon: "app/favicon.ico"
      }),
      new webpack.DefinePlugin(envKeys)
    ],
  }
}

// module.exports = {
//   entry: ["@babel/polyfill", './app/app.jsx'],
//   mode: 'development',
//   output: {
//     path: path.resolve(__dirname, './public'),
//     filename: 'bundle.js',
//     publicPath: '/',
//   },
//   devServer: {
//     historyApiFallback: true,
//     port: 8080,
//     // open: true,
//     hot: true
//   },
//   resolve: {
//     extensions: ["", ".js", ".jsx"],
//     alias: {
//       _components: path.resolve(__dirname, 'app/components/'),
//       _store: path.resolve(__dirname, 'app/store/'),
//       _pages: path.resolve(__dirname, 'app/pages/'),
//       _app: path.resolve(__dirname, 'app/'),
//     }
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           { loader: 'style-loader' },
//           { loader: 'css-loader',}
//         ]
//       },
//       {
//         test: /\.s[ac]ss$/,
//           exclude: /\.module\.scss$/,
//           use: [
//           { loader: 'style-loader' },
//           {
//             loader: 'css-loader',
//             options: {
//               importLoaders: 1,
//               modules: {
//                 compileType: 'icss'
//               }
//             }
//           },
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.module\.s[ac]ss$/,
//         use: [
//           { loader: 'style-loader' },
//           {
//             loader: 'css-loader',
//             options: {
//               importLoaders: 1,
//               modules: {
//                 compileType: 'module'
//               }
//             }
//           },
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]',
//               outputPath: 'fonts/'
//             }
//           }
//         ]
//       },
//       {
//         test: /\.(png|svg|jpg|gif|ico)$/,
//         use: ['file-loader?name=[name].[ext]']
//       },
//       {
//           test: /\.jsx?$/,
//           loader: "babel-loader",
//       }
//     ]
//   },
//   plugins: [new HtmlWebpackPlugin({
//       title: 'Claim Tracker',
//       filename: 'index.html',
//       template: 'app/template.html',
//       favicon: "app/favicon.ico"
//   })],
// };