const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const lessTheme = require('./less-theme.js');

const path = require('path');
const dist = path.resolve(__dirname, './dist');
const src = path.resolve(__dirname, './src');


//清除打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 提取css
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCss = require('optimize-css-assets-webpack-plugin');

//压缩js
const TerseWebpackPlugin = require('terser-webpack-plugin');

//增强代码代码压缩工具
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const Cssnano =  require('cssnano');



const getStyleLodersCommen = function(){
  let arr = [
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


let decConfig = {
  mode: 'development',
  output: {
    filename: 'assets/js/[name].[chunkHash:8].js',
    chunkFilename: 'assets/js/[id].[chunkHash:8].js',
    path: dist,
  },
  devtool: 'hidden-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerseWebpackPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
      })
    ],
  },
  module: {
    rules: [
      // 样式文件处理
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          ...getStyleLodersCommen(),
          'sass-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          ...getStyleLodersCommen(),
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: lessTheme,
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, './'), //根目录
      verbose: false,  //开启在控制台输出信息
      dry: false, //启用删除文件
      // exclude:  ['test.html'], // 排除
      // watch: false,     // If true, remove files on recompile. 
      // beforeEmit: false // 在将文件发送到输出目录之前执行清理
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      // chunkFilename: 'assets/css/[id].[contenthash:8].css',
    }),
    new OptimizeCss({
      cssProcessor: Cssnano, //引入cssnano配置压缩选项
      //传递给cssProcessor的选项，默认为{}
      cssProcessorOptions: { 
        discardComments: { removeAll: true },
        // 在安全模式下运行 cssnano 从而避免潜在的不安全转换
        safe: true,
      },
      //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
      canPrint: true,
    }),

    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,  //是否格式化
          comments: false,  //是否保留注释
        },
        compress: {
          // warnings: false,
          drop_console: true, // 是否删除代码中所有的console语句
          collapse_vars: true,
          reduce_vars: true,
        },
        warnings: false,
      }
    }),


    

  ]

}


module.exports = merge(baseConfig, decConfig);