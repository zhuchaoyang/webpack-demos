const path = require('path');
const webpack = require('webpack');

let library = '_dll_[name]';

module.exports = {
  // mode: 'development',
  entry: {
    dll: [
      'react', 
      'react-dom',
      'history',
    ],
  },
  output:{
    filename: '[name].[chunkHash:8].js',
    path: path.resolve(__dirname,'./dll'),

    // vendor.dll.js中暴露出的 动态库的全局变量名称
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    library,
  },
  plugins:[
    new webpack.DllPlugin({
      // 该名称需要和output.library 保持一致
      path: path.join(__dirname,'dll', '[name]-manifest.json'),
      name: library,
    })
  ]
}