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



// const path = require('path');
// const AutoDllPlugin = require('autodll-webpack-plugin');

// module.exports = {
//   plugins: [
//     new AutoDllPlugin({
//       inject: true, //设为 true 就把 DLL bundles 插到 index.html 里
//       debug: true,
//       // AutoDllPlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
//       // context: path.resolve(__dirname, '../'),
//       filename: '[name].[chunkHash:8].js',
//       path: path.resolve(__dirname, './dll'),
//       entry: {
//         react: [
//           'react', 
//           'react-dom',
//           'history'
//         ]
//       }
//     })
//   ]
// }