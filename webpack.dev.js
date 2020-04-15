const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const lessTheme = require('./less-theme.js');

const path = require('path');
const dist = path.resolve(__dirname, './dist');
const src = path.resolve(__dirname, './src');

// 二次打包使用缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


const getStyleLodersCommen = function(){
  let arr = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        // modules: true,
        modules: 'global',
      }
    },
    'postcss-loader'
  ];

  return arr;
}

let devConfig = {
  mode: 'development',
  output: {
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[id].js',
    path: dist,
  },
  devServer: {
    contentBase: dist,
    compress: true,
    // inline: false,
    // 在开发单页时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    // historyApiFallback: true,

    host: '0.0.0.0',
    port: 4000,
    hot: false,
    // hotOnly: true,
    proxy: {
      "/cgi": {
        target: 'https://livetest.zuimeia.com',
        changeOrigin: true,
        pathRewrite: { "^/cgi" : "" },
        secure: false,
      }
    },
    open: true,
    overlay: true,
    // useLocalIp: true,
    watchContentBase: true,
    watchOptions: {
      ignored:['node_modules'],
      aggregateTimeout: 300,
      poll: 1000,
    }
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      // 样式文件处理
      {
        test: /\.s?css$/,
        use: [
          ...getStyleLodersCommen(),
          'sass-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          ...getStyleLodersCommen(),
          {
            loader: 'less-loader',
            options: {
              modifyVars: lessTheme,
              javascriptEnabled: true,
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
  ]

}


module.exports = merge(baseConfig, devConfig);